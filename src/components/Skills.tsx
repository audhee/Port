import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Settings2,
  Server,
  Bot,
  Brain,
  Atom,
  Wrench,
} from 'lucide-react';
import {
  EASE_PREMIUM,
  VIEWPORT_ONCE,
  fadeUp,
  fadeUpScale,
  popIn,
  staggerContainer,
  transitionBase,
  staggerSkills,
} from '@/lib/motion';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
  gridSpan: {
    sm: string;
    lg: string;
  };
  accent: {
    border: string;
    glow: string;
    iconBg: string;
    iconText: string;
    chipHover: string;
  };
};

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Software Engineering',
    icon: Settings2,
    skills: [
      'Java',
      'Python',
      'Data Structures & Algorithms',
      'OOP',
      'Git',
      'GitHub',
      'Docker',
    ],
    gridSpan: { sm: 'col-span-1', lg: 'col-span-1' },
    accent: {
      border: 'hover:border-[#8ca888]/70',
      glow: 'hover:shadow-[0_0_36px_-12px_rgba(140,168,136,0.45)]',
      iconBg: 'bg-[#8ca888]/15 border-[#8ca888]/35',
      iconText: 'text-[#a8c4a2]',
      chipHover:
        'hover:border-[#8ca888]/50 hover:bg-[#8ca888]/15 hover:text-[#e8e8e3] hover:shadow-[0_0_16px_-4px_rgba(140,168,136,0.4)]',
    },
  },
  {
    title: 'Backend Development',
    icon: Server,
    skills: [
      'Spring Boot',
      'FastAPI',
      'REST APIs',
      'JPA/Hibernate',
      'SQL',
      'MySQL',
      'PostgreSQL',
      'API Integration',
      'JWT Authentication',
    ],
    gridSpan: { sm: 'col-span-1', lg: 'col-span-2' },
    accent: {
      border: 'hover:border-sky-400/50',
      glow: 'hover:shadow-[0_0_36px_-12px_rgba(56,189,248,0.35)]',
      iconBg: 'bg-sky-400/10 border-sky-400/30',
      iconText: 'text-sky-300',
      chipHover:
        'hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-[#e8e8e3] hover:shadow-[0_0_16px_-4px_rgba(56,189,248,0.35)]',
    },
  },
  {
    title: 'AI / ML',
    icon: Bot,
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'OpenCV',
      'Scikit-learn',
      'NumPy',
      'Pandas',
    ],
    gridSpan: { sm: 'col-span-1', lg: 'col-span-2' },
    accent: {
      border: 'hover:border-violet-400/50',
      glow: 'hover:shadow-[0_0_36px_-12px_rgba(167,139,250,0.35)]',
      iconBg: 'bg-violet-400/10 border-violet-400/30',
      iconText: 'text-violet-300',
      chipHover:
        'hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-[#e8e8e3] hover:shadow-[0_0_16px_-4px_rgba(167,139,250,0.35)]',
    },
  },
  {
    title: 'GenAI / Automation',
    icon: Brain,
    skills: [
      'LLMs',
      'RAG',
      'AI Agents',
      'Agentic AI',
      'AI Automation',
      'Prompt Engineering',
      'Embeddings',
      'Vector Databases',
      'API Integration',
    ],
    gridSpan: { sm: 'col-span-1', lg: 'col-span-2' },
    accent: {
      border: 'hover:border-teal-400/50',
      glow: 'hover:shadow-[0_0_36px_-12px_rgba(45,212,191,0.35)]',
      iconBg: 'bg-teal-400/10 border-teal-400/30',
      iconText: 'text-teal-300',
      chipHover:
        'hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-[#e8e8e3] hover:shadow-[0_0_16px_-4px_rgba(45,212,191,0.35)]',
    },
  },
  {
    title: 'Frontend',
    icon: Atom,
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Web Design'],
    gridSpan: { sm: 'col-span-1', lg: 'col-span-1' },
    accent: {
      border: 'hover:border-cyan-400/50',
      glow: 'hover:shadow-[0_0_36px_-12px_rgba(34,211,238,0.35)]',
      iconBg: 'bg-cyan-400/10 border-cyan-400/30',
      iconText: 'text-cyan-300',
      chipHover:
        'hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-[#e8e8e3] hover:shadow-[0_0_16px_-4px_rgba(34,211,238,0.35)]',
    },
  },
  {
    title: 'Tools & Deployment',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'Maven'],
    gridSpan: { sm: 'col-span-1', lg: 'col-span-1' },
    accent: {
      border: 'hover:border-amber-400/45',
      glow: 'hover:shadow-[0_0_36px_-12px_rgba(251,191,36,0.3)]',
      iconBg: 'bg-amber-400/10 border-amber-400/30',
      iconText: 'text-amber-300',
      chipHover:
        'hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-[#e8e8e3] hover:shadow-[0_0_16px_-4px_rgba(251,191,36,0.3)]',
    },
  },
];

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-ink-bg px-6 py-24 md:px-10 md:py-32"
    >
      {/* Background gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-ink-accent/[0.08] blur-3xl" />
        <div className="absolute right-[15%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-ink-accent/[0.05] blur-3xl" />
        <div className="absolute left-[40%] top-[60%] h-[300px] w-[300px] rounded-full bg-ink-border/[0.08] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-12 md:mb-16"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-accent font-body"
            variants={fadeUp}
            transition={transitionBase}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
            Skills
          </motion.span>
          <motion.h2
            className="mt-5 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl font-heading tracking-tight-heading"
            variants={fadeUp}
            transition={transitionBase}
          >
            What I Work With
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted text-balance font-body"
            variants={fadeUp}
            transition={transitionBase}
          >
            A toolkit spanning software engineering, backend systems, AI/ML, and
            the glue that ships products.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerSkills}
        >
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <SkillCard key={category.title} category={category} index={index} />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = category.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={fadeUpScale}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-ink-accent/[0.08] via-ink-accent/[0.02] to-black p-6 backdrop-blur-sm transition-all duration-500 md:p-7 ${category.gridSpan.sm} ${category.gridSpan.lg} ${category.accent.border} ${category.accent.glow} hover:-translate-y-1`}
      style={{
        boxShadow: '0 4px 24px -8px rgba(0, 0, 0, 0.4)',
      }}
      whileHover={{
        boxShadow: '0 8px 32px -8px rgba(140, 168, 136, 0.25)',
      }}
    >
      {/* Soft gradient border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(140, 168, 136, 0.1), transparent)',
        }}
      />
      
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="mb-5 flex items-center gap-3">
        <motion.span
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${category.accent.iconBg} ${category.accent.iconText} transition-transform duration-300 group-hover:scale-105`}
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [1, 0.8, 1],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <Icon className="h-[1.2rem] w-[1.2rem]" strokeWidth={2.1} />
        </motion.span>
        <h3 className="text-lg font-bold tracking-tight text-ink-text font-heading">
          {category.title}
        </h3>
      </div>

      <motion.ul
        className="flex flex-wrap gap-2"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.15,
            },
          },
        }}
      >
        {category.skills.map((skill) => (
          <motion.li
            key={skill}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          >
            <span
              className={`inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-wide text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] ${category.accent.chipHover} font-body`}
            >
              {skill}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}
