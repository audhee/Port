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
  const heroScale = useTransform(scrollYProgress, [0, 0.95], [1, 0.965]);
  const heroY     = useTransform(scrollYProgress, [0, 0.95], [0, -48]);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bg pt-36 pb-24 md:pt-48 md:pb-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={
          reduceMotion
            ? undefined
            : { opacity: heroOpacity, scale: heroScale }
        }
      >
        <NeuralBackground />

        {/* Subtle ambient glow overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent blur-3xl opacity-60" />
        </div>
      </motion.div>

      {/* Single shared scroll-driven wrapper for all hero content */}
      <motion.div
        className="relative z-10"
        style={reduceMotion ? undefined : { opacity: heroOpacity, y: heroY }}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          {/* Uppercase label */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              AI/ML Engineering Student
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-center text-4xl font-bold leading-[1.15] tracking-tight text-text text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem] tracking-tight-heading">
            Building intelligent systems that solve real-world problems.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-text-secondary text-balance">
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
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-bg transition-all duration-300 hover:bg-[#C5D4CB] hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 sm:w-auto"
            >
              View My Work
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-transparent px-7 py-3.5 text-base font-semibold text-text transition-all duration-300 hover:border-primary hover:bg-white/[0.03] hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 sm:w-auto"
            >
              <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              GitHub
            </a>
          </div>
        </div>

        {/* Tech Marquee */}
        <div className="w-full">
          <TechMarquee />
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex flex-col items-center gap-2 md:mt-14">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-muted/70">
            Scroll for more
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-text-muted/70" />
        </div>
      </motion.div>
    </section>
  );
}
