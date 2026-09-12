import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  EASE_PREMIUM,
  VIEWPORT_ONCE,
  fadeUp,
  fadeUpScale,
  staggerContainer,
  transitionBase,
} from '@/lib/motion';

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
};

const PROJECTS: Project[] = [
  {
    title: 'PG Decoded',
    subtitle: 'Freelancing Project',
    description:
      'Full-stack business solution developed for a Delhi-based client, integrating AI-powered functionality with a modern web application.',
    tech: ['Java', 'Spring Boot', 'React', 'Grok AI API'],
    link: 'https://github.com/audhee/PG_decoded',
  },
  {
    title: 'Smart Expense Tracker',
    subtitle: 'Personal Finance App',
    description:
      'A full-stack personal finance application that helps users track income and expenses, manage spending, and gain financial insights, with AI-powered personalized recommendations.',
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Groq AI', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/audhee/Smart_Expense_Tracker',
  },
  {
    title: 'Arohan',
    subtitle: 'AI Emergency Care App',
    description:
      'An AI-powered emergency-care mobile application providing rapid assistance during critical situations, with SOS functionality, emergency-contact alerts, location sharing, and AI-powered voice guidance.',
    tech: ['React Native', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini', 'Twilio', 'PostgreSQL', 'Redis'],
    link: 'https://github.com/audhee/Signalburn',
  },
  {
    title: 'IntelliMed',
    subtitle: 'AI-Powered Longitudinal Health Intelligence',
    description:
      'An AI-powered platform that transforms medical reports into structured longitudinal health information, using OCR and AI to extract medical data, normalize biomarkers, analyze trends over time, and generate intelligent insights.',
    tech: ['React Native', 'FastAPI', 'Python', 'Gemini Vision', 'Celery', 'Redis', 'PostgreSQL'],
    link: 'https://github.com/audhee/IntelliMed',
  },
];

export default function SelectedWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="relative bg-ink-bg px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 md:mb-20"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-accent"
            variants={fadeUp}
            transition={transitionBase}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
            Selected Work
          </motion.span>
          <motion.h2
            className="mt-5 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl"
            variants={fadeUp}
            transition={transitionBase}
          >
            Things I've Built
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted text-balance"
            variants={fadeUp}
            transition={transitionBase}
          >
            A collection of projects where I explore AI, software engineering,
            automation, and practical problem solving.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={fadeUpScale}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              boxShadow: '0 24px 48px -20px rgba(140, 168, 136, 0.22)',
              transition: { duration: 0.28, ease: EASE_PREMIUM },
            }
      }
      className="group relative flex flex-col rounded-2xl border border-ink-border/60 bg-ink-border/[0.07] p-7 transition-colors duration-300 hover:border-ink-accent/60 hover:bg-ink-border/[0.12] md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-ink-text md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-ink-accent">
            {project.subtitle}
          </p>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:text-ink-accent group-hover:rotate-45" />
      </div>

      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-ink-border/50 px-3 py-1 text-xs font-medium text-ink-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-text transition-colors duration-300 hover:text-ink-accent"
      >
        View Project
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}
