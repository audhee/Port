import { useRef } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg px-6 py-24 md:px-10 md:py-32"
    >
      {/* Subtle ambient atmosphere */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ── LEFT SIDE: All Editorial Text Content ──────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-7">
            {/* Label & Heading */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                About Me
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl tracking-tight-heading">
                Who I Am
              </h2>
            </div>

            {/* Biography */}
            <p className="mt-8 text-lg leading-relaxed text-text-secondary text-balance md:text-xl md:leading-relaxed">
              I'm <span className="font-semibold text-text">Dheeraj</span> — a
              final-year AI &amp; ML student at{' '}
              <span className="text-text">DSATM</span>, currently interning as a
              Software Engineer at{' '}
              <span className="text-primary">Hasprana Healthcare</span>. Based
              between Bengaluru and Davanagere, I'm building my foundation
              across AI/ML, backend systems, and automation — with a growing
              focus on shipping intelligent, real-world applications.
            </p>

            {/* Fact badges */}
            <ul className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap md:gap-3.5">
              {FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <li key={fact.label}>
                    <div className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/[0.08] bg-surface/60 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_24px_-6px_rgba(180,197,186,0.45)] sm:px-5 sm:py-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-primary transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-text transition-colors duration-300 group-hover:text-primary">
                          {fact.label}
                        </span>
                        <span className="block text-[0.7rem] font-medium tracking-wide text-text-muted/70">
                          {fact.detail}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Status statement */}
            <div className="mt-10 flex items-center gap-3 border-t border-white/[0.06] pt-8 md:mt-12">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <p className="text-sm font-medium tracking-wide text-text-muted">
                Open to building useful software &amp; AI products
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDE: Embedded Editorial Photo ───────────────────── */}
          <div className="relative flex items-center justify-center lg:col-span-5 xl:col-span-5 lg:justify-end">
            {/* Ambient backlight glow directly behind the silhouette */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent blur-3xl lg:h-[480px] lg:w-[380px]"
              aria-hidden
            />

            {/* Embedded portrait wrapper with zero borders and soft organic vignette */}
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[460px]">
              <div
                className="relative overflow-hidden"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 82% 86% at 52% 48%, black 48%, rgba(0,0,0,0.8) 68%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 82% 86% at 52% 48%, black 48%, rgba(0,0,0,0.8) 68%, transparent 100%)',
                }}
              >
                {/* Edge feather gradients to seamlessly melt into background */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2/5 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-bg via-bg/50 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-bg via-bg/40 to-transparent" />

                {/* The crisp, unblurred, clearly visible profile photo */}
                <img
                  src="/about-bg.jpg"
                  alt="Dheeraj — AI/ML Student and Software Engineer"
                  className="h-[440px] w-full object-cover object-[50%_32%] filter contrast-[1.06] brightness-[1.02] saturate-[0.98] transition-all duration-700 sm:h-[500px] lg:h-[560px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
