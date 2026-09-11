import { useEffect, useState, useMemo } from 'react';

type ContributionDay = { date: string; count: number };
type ContributionData = {
  username: string;
  totalContributions: number;
  days: ContributionDay[];
};

const GITHUB_USERNAME = 'audhee';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 5 intensity levels using the site palette
// Level 0: empty (secondary border), 1-4: increasing accent opacity
const LEVEL_COLORS = [
  'border-ink-border/30 bg-ink-border/10',
  'bg-ink-accent/25',
  'bg-ink-accent/50',
  'bg-ink-accent/75',
  'bg-ink-accent',
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Wed', 'Fri'];

export default function StatsSection() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchContributions() {
      try {
        const url = `${SUPABASE_URL}/functions/v1/github-contributions?username=${GITHUB_USERNAME}`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ContributionData = await res.json();
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchContributions();
    return () => {
      cancelled = true;
    };
  }, []);

  // Build the grid: 53 weeks x 7 days
  const { weeks, monthLabels } = useMemo(() => {
    if (!data || data.days.length === 0) {
      return { weeks: [] as ContributionDay[][], monthLabels: [] as { label: string; index: number }[] };
    }

    // Sort days by date
    const sorted = [...data.days].sort((a, b) => a.date.localeCompare(b.date));

    // The first day might not be Sunday — pad the beginning
    const firstDate = new Date(sorted[0].date + 'T00:00:00Z');
    const firstDayOfWeek = firstDate.getUTCDay(); // 0 = Sunday

    const padded: (ContributionDay | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) padded.push(null);
    padded.push(...sorted);

    // Group into weeks (7-day columns)
    const weekCols: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weekCols.push(padded.slice(i, i + 7));
    }

    // Ensure each week has exactly 7 entries
    const fullWeeks = weekCols.map((w) => {
      const week = [...w];
      while (week.length < 7) week.push(null);
      return week;
    });

    // Month labels — find which week column each month starts at
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;
    fullWeeks.forEach((week, weekIdx) => {
      const firstDay = week.find((d) => d !== null);
      if (firstDay) {
        const month = new Date(firstDay.date + 'T00:00:00Z').getUTCMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTHS[month], index: weekIdx });
          lastMonth = month;
        }
      }
    });

    return { weeks: fullWeeks, monthLabels: labels };
  }, [data]);

  return (
    <section className="relative bg-ink-bg px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Part 1 — Stat highlight */}
        <div className="flex flex-col items-center text-center">
          <p className="text-5xl font-extrabold tracking-tight text-ink-text sm:text-6xl md:text-7xl">
            100M+
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
            AI Tokens Used
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-20 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-ink-border/50 to-transparent md:mt-28" />

        {/* Part 2 — GitHub contribution heatmap */}
        <div className="mt-20 md:mt-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
              Personal GitHub Activity
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink-text sm:text-3xl md:text-4xl">
              Coding Consistency
            </h2>
          </div>

          {/* Heatmap card */}
          <div className="mt-12 rounded-2xl border border-ink-border/60 bg-ink-border/[0.05] p-6 md:p-8">
            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-border border-t-ink-accent" />
                  <p className="text-sm text-ink-muted">Loading contributions...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-base font-medium text-ink-text">
                  Couldn't load GitHub activity
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  The contribution graph will appear here once available.
                </p>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-accent transition-colors duration-300 hover:text-ink-text"
                >
                  View on GitHub →
                </a>
              </div>
            )}

            {/* Heatmap */}
            {data && !loading && !error && (
              <>
                {/* Total contributions */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-ink-muted">
                    <span className="font-bold text-ink-text">
                      {data.totalContributions.toLocaleString()}
                    </span>{' '}
                    contributions in the last year
                  </p>
                </div>

                {/* Scrollable heatmap on mobile */}
                <div className="overflow-x-auto">
                  <div className="min-w-[700px]">
                    {/* Month labels */}
                    <div className="ml-7 flex gap-[3px]">
                      {Array.from({ length: weeks.length }).map((_, weekIdx) => {
                        const label = monthLabels.find((m) => m.index === weekIdx);
                        return (
                          <div
                            key={weekIdx}
                            className="w-[11px] text-[0.6rem] text-ink-muted/60"
                          >
                            {label ? (
                              <span className="absolute">{label.label}</span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>

                    {/* Grid: day labels + weeks */}
                    <div className="mt-1 flex gap-[3px]">
                      {/* Day labels column */}
                      <div className="flex w-7 flex-col gap-[3px] pt-0.5">
                        {Array.from({ length: 7 }).map((_, dayIdx) => (
                          <div
                            key={dayIdx}
                            className="h-[11px] text-[0.6rem] leading-[11px] text-ink-muted/50"
                          >
                            {dayIdx % 2 === 1 ? DAYS[Math.floor(dayIdx / 2)] : ''}
                          </div>
                        ))}
                      </div>

                      {/* Week columns */}
                      {weeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-[3px]">
                          {week.map((day, dayIdx) => {
                            if (!day) {
                              return (
                                <div
                                  key={dayIdx}
                                  className="h-[11px] w-[11px] rounded-[2px] bg-transparent"
                                />
                              );
                            }
                            const level = getLevel(day.count);
                            return (
                              <div
                                key={dayIdx}
                                className={`h-[11px] w-[11px] rounded-[2px] transition-transform duration-200 hover:scale-150 ${
                                  level === 0
                                    ? `border ${LEVEL_COLORS[0]}`
                                    : LEVEL_COLORS[level]
                                }`}
                                title={`${day.count} contributions on ${day.date}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-end gap-2">
                  <span className="text-[0.7rem] text-ink-muted">Less</span>
                  {LEVEL_COLORS.map((color, i) => (
                    <div
                      key={i}
                      className={`h-[11px] w-[11px] rounded-[2px] ${
                        i === 0 ? `border ${color}` : color
                      }`}
                    />
                  ))}
                  <span className="text-[0.7rem] text-ink-muted">More</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
