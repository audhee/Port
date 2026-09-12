import { useEffect, useState, useCallback } from 'react';
import { Github, ArrowUpRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ContributionDay = {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type APIResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const USERNAME = 'audhee';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;
const GITHUB_URL = `https://github.com/${USERNAME}`;

/** Inline-style colours per level (0–4) matching ink-border / ink-accent palette */
const LEVEL_COLORS: Record<number, string> = {
  0: 'rgba(78,96,70,0.12)',    // ink-border very faint — empty
  1: 'rgba(78,96,70,0.45)',    // ink-border dim
  2: 'rgba(140,168,136,0.45)', // ink-accent dim
  3: 'rgba(140,168,136,0.72)', // ink-accent medium
  4: 'rgba(140,168,136,1)',    // ink-accent full
};

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Group days into week columns (7 rows each), padded with nulls to align Sunday=0 */
function groupIntoWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];
  const firstDate = new Date(days[0].date + 'T00:00:00');
  const offset = firstDate.getDay(); // 0 Sun … 6 Sat
  const padded: (ContributionDay | null)[] = [...Array(offset).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

/** Return which column each month label should appear above */
function getMonthPositions(weeks: (ContributionDay | null)[][]): { label: string; col: number }[] {
  const seen = new Set<string>();
  const positions: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const day = week.find((d) => d !== null);
    if (!day) return;
    const month = day.date.slice(0, 7);
    if (!seen.has(month)) {
      seen.add(month);
      const monthIndex = parseInt(month.slice(5, 7), 10) - 1;
      positions.push({ label: MONTH_LABELS[monthIndex], col });
    }
  });
  return positions;
}

/** Unique years from contribution data, descending */
function getYears(contributions: ContributionDay[]): number[] {
  const years = new Set<number>();
  contributions.forEach((d) => years.add(parseInt(d.date.slice(0, 4), 10)));
  return Array.from(years).sort((a, b) => b - a);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: APIResponse = await res.json();
      const days: ContributionDay[] = data.contributions ?? [];
      const years = getYears(days);
      setContributions(days);
      setAvailableYears(years);
      setSelectedYear(years[0] ?? null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = selectedYear
    ? contributions.filter((d) => d.date.startsWith(String(selectedYear)))
    : contributions;

  const weeks = groupIntoWeeks(filtered);
  const monthPositions = getMonthPositions(weeks);
  const totalForYear = filtered.reduce((sum, d) => sum + d.count, 0);

  return (
    <section
      id="github-activity"
      className="relative bg-ink-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
            Personal GitHub Activity
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl">
            Coding Consistency
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted text-balance">
            A year-long view of my open-source contributions and coding activity on GitHub.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-ink-border/60 bg-ink-border/[0.07] p-6 md:p-8">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-border border-t-ink-accent" />
              <p className="text-sm text-ink-muted">Loading GitHub activity&hellip;</p>
            </div>
          )}

          {/* Error fallback */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <Github className="h-10 w-10 text-ink-muted/50" />
              <p className="text-base font-semibold text-ink-muted">
                Couldn&apos;t load GitHub activity
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-accent transition-colors duration-200 hover:text-ink-text"
              >
                View on GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Success */}
          {!loading && !error && (
            <>
              {/* Top row: count + year pills */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-extrabold tracking-tight text-ink-text">
                    {totalForYear.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm text-ink-muted">
                    contributions in {selectedYear}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      id={`year-toggle-${yr}`}
                      onClick={() => setSelectedYear(yr)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                        selectedYear === yr
                          ? 'border-ink-accent bg-ink-accent/15 text-ink-accent'
                          : 'border-ink-border/50 bg-transparent text-ink-muted hover:border-ink-accent/50 hover:text-ink-text'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heatmap */}
              <div className="overflow-x-auto pb-2">
                <div style={{ minWidth: '600px' }}>
                  {/* Month labels */}
                  <div
                    className="relative mb-1 flex"
                    style={{ paddingLeft: '30px' }}
                  >
                    {monthPositions.map(({ label, col }) => (
                      <span
                        key={`${label}-${col}`}
                        className="absolute text-[0.62rem] font-medium uppercase tracking-wider text-ink-muted/70"
                        style={{ left: `calc(30px + ${col} * 13px)` }}
                      >
                        {label}
                      </span>
                    ))}
                    <span className="invisible text-[0.62rem]">Jan</span>
                  </div>

                  {/* Grid */}
                  <div className="flex gap-0">
                    {/* Weekday labels */}
                    <div className="flex flex-col gap-[2px] pr-1.5" style={{ width: '30px' }}>
                      {WEEKDAY_LABELS.map((label, i) => (
                        <div key={i} className="flex h-[11px] items-center">
                          {label && (
                            <span className="text-[0.58rem] font-medium uppercase tracking-wider text-ink-muted/60">
                              {label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Week columns */}
                    <div className="flex gap-[2px]">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[2px]">
                          {week.map((day, di) =>
                            day ? (
                              <div
                                key={day.date}
                                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                                className="relative h-[11px] w-[11px] cursor-default rounded-[2px] transition-transform duration-150 hover:z-10 hover:scale-125"
                                style={{
                                  backgroundColor: LEVEL_COLORS[day.level],
                                  outline: day.level > 0 ? '1px solid rgba(140,168,136,0.12)' : 'none',
                                }}
                              />
                            ) : (
                              <div key={`empty-${wi}-${di}`} className="h-[11px] w-[11px]" />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex items-center justify-end gap-1.5">
                    <span className="text-[0.62rem] font-medium uppercase tracking-wider text-ink-muted/60">Less</span>
                    {([0, 1, 2, 3, 4] as const).map((lvl) => (
                      <div
                        key={lvl}
                        className="h-[11px] w-[11px] rounded-[2px]"
                        style={{ backgroundColor: LEVEL_COLORS[lvl] }}
                      />
                    ))}
                    <span className="text-[0.62rem] font-medium uppercase tracking-wider text-ink-muted/60">More</span>
                  </div>
                </div>
              </div>

              {/* Footer link */}
              <div className="mt-6 flex justify-end">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink-accent"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
