import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, ChevronDown } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import TechMarquee from '@/components/TechMarquee';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55, 0.95], [1, 0.9, 0]);
  const heroBlur = useTransform(scrollYProgress, [0.18, 0.95], ['blur(0px)', 'blur(18px)']);
  const heroScale = useTransform(scrollYProgress, [0, 0.95], [1, 0.965]);
  const heroY = useTransform(scrollYProgress, [0, 0.95], [0, -48]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-ink-bg pt-36 pb-24 md:pt-48 md:pb-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={
          reduceMotion
            ? undefined
            : { opacity: heroOpacity, filter: heroBlur, scale: heroScale }
        }
      >
        <NeuralBackground />

        {/* Subtle ambient glow overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-ink-border/20 via-ink-border/5 to-transparent blur-3xl opacity-60" />
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10"
        style={reduceMotion ? undefined : { opacity: heroOpacity, filter: heroBlur, y: heroY }}
      >
        {/* Uppercase label */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border/60 bg-ink-border/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted font-body">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-accent" />
            AI/ML Engineering Student
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-center text-4xl font-bold leading-[1.15] tracking-tight text-ink-text text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem] font-heading tracking-tight-heading">
          Building intelligent systems that solve real-world problems.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-ink-muted text-balance font-body">
          I'm Dheeraj, an AI/ML engineering student passionate about software
          development, AI automation, intelligent agents, and building practical
          technology that creates real-world impact.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              const targetElement = document.getElementById('work');
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
                window.history.pushState(null, '', '#work');
              }
            }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-accent px-7 py-3.5 text-base font-semibold text-ink-bg transition-all duration-300 hover:bg-ink-accent/90 hover:shadow-xl hover:shadow-ink-accent/20 hover:-translate-y-0.5 sm:w-auto font-body"
          >
            View My Work
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-border bg-transparent px-7 py-3.5 text-base font-semibold text-ink-text transition-all duration-300 hover:border-ink-accent hover:bg-ink-border/10 hover:shadow-lg hover:shadow-ink-accent/5 hover:-translate-y-0.5 sm:w-auto font-body"
          >
            <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            GitHub
          </a>
        </div>

      </motion.div>

      <motion.div
        className="relative z-10 w-full"
        style={reduceMotion ? undefined : { opacity: heroOpacity, filter: heroBlur, y: heroY }}
      >
        <TechMarquee />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-10 flex flex-col items-center gap-2 md:mt-14"
        style={reduceMotion ? undefined : { opacity: heroOpacity, filter: heroBlur, y: heroY }}
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted/70 font-body">
          Scroll for more
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce text-ink-muted/70" />
      </motion.div>
    </section>
  );
}
