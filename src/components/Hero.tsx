import { ArrowRight, Github, ChevronDown } from 'lucide-react';

const TECH_TAGS = ['Java', 'Python', 'AI Automation', 'AI Agents', 'React', 'Spring Boot'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-bg pt-32 pb-24 md:pt-44 md:pb-32">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-ink-border/20 via-ink-border/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-ink-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Uppercase label */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border/60 bg-ink-border/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-accent" />
            AI/ML Engineering Student
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-center text-4xl font-bold leading-[1.15] tracking-tight text-ink-text text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem]">
          Building intelligent systems that solve real-world problems.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-ink-muted text-balance">
          I'm Dheeraj, an AI/ML engineering student passionate about software
          development, AI automation, intelligent agents, and building practical
          technology that creates real-world impact.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#work"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-accent px-7 py-3.5 text-base font-semibold text-ink-bg transition-all duration-300 hover:bg-ink-accent/90 hover:shadow-xl hover:shadow-ink-accent/20 hover:-translate-y-0.5 sm:w-auto"
          >
            View My Work
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-border bg-transparent px-7 py-3.5 text-base font-semibold text-ink-text transition-all duration-300 hover:border-ink-accent hover:bg-ink-border/10 hover:shadow-lg hover:shadow-ink-accent/5 hover:-translate-y-0.5 sm:w-auto"
          >
            <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            GitHub
          </a>
        </div>

        {/* Tech tags */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {TECH_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink-border/60 bg-transparent px-4 py-1.5 text-sm font-medium text-ink-muted transition-all duration-300 hover:border-ink-border hover:bg-ink-border/10 hover:text-ink-text hover:-translate-y-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-16 flex flex-col items-center gap-2 md:mt-24">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted/70">
          Scroll for more
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce text-ink-muted/70" />
      </div>
    </section>
  );
}
