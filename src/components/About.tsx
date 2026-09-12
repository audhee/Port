import { GraduationCap, Briefcase, MapPin } from 'lucide-react';

const FACTS = [
  {
    label: 'AI/ML Student',
    detail: 'DSATM · Final Year',
    icon: GraduationCap,
  },
  {
    label: 'SWE Intern @ Hasprana Healthcare',
    detail: 'Software Engineering',
    icon: Briefcase,
  },
  {
    label: 'Bengaluru / Davanagere',
    detail: 'Based between both',
    icon: MapPin,
  },
] as const;

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-bg px-6 py-24 md:px-10 md:py-32">
      {/* Ambient gradient blob */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-ink-accent/10 blur-3xl md:h-96 md:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-ink-border/30 blur-3xl md:h-80 md:w-80 about-blob"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-accent" />
            About Me
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl">
            Who I Am
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-8 shadow-[0_0_60px_-28px_rgba(140,168,136,0.35)] backdrop-blur-md md:p-12 lg:p-14">
          {/* Soft inner glow line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-accent/50 to-transparent"
            aria-hidden
          />

          <p className="max-w-3xl text-lg leading-relaxed text-ink-muted text-balance md:text-xl md:leading-relaxed">
            I'm{' '}
            <span className="font-semibold text-ink-text">Dheeraj</span>
            {' '}— a final-year AI &amp; ML student at{' '}
            <span className="text-ink-text">DSATM</span>, currently interning as a
            Software Engineer at{' '}
            <span className="text-ink-accent">Hasprana Healthcare</span>. Based
            between Bengaluru and Davanagere, I'm building my foundation across
            AI/ML, backend systems, and automation — with a growing focus on
            shipping intelligent, real-world applications.
          </p>

          {/* Fact badges */}
          <ul className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap md:gap-4">
            {FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <li key={fact.label}>
                  <div className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-ink-border/50 bg-ink-bg/60 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-accent/70 hover:bg-ink-accent/10 hover:shadow-[0_0_24px_-6px_rgba(168,196,162,0.45)] sm:px-5 sm:py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-border/40 bg-ink-border/15 text-ink-accent transition-colors duration-300 group-hover:border-ink-accent/50 group-hover:bg-ink-accent/20">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink-text transition-colors duration-300 group-hover:text-ink-accent">
                        {fact.label}
                      </span>
                      <span className="block text-[0.7rem] font-medium tracking-wide text-ink-muted/70">
                        {fact.detail}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Decorative status line */}
          <div className="mt-10 flex items-center gap-3 border-t border-white/[0.06] pt-8 md:mt-12">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink-accent opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink-accent" />
            </span>
            <p className="text-sm font-medium tracking-wide text-ink-muted">
              Open to building useful software &amp; AI products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
