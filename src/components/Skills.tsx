import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Settings2,
  Server,
  Bot,
  Brain,
  Layout,
  Wrench,
} from 'lucide-react';
import {
  EASE_PREMIUM,
  VIEWPORT_ONCE,
  fadeUp,
  fadeUpScale,
  staggerContainer,
  transitionBase,
} from '@/lib/motion';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
  gridSpan: {
    base: string;
    md: string;
    lg: string;
  };
};

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Software Engineering',
    icon: Settings2,
    description: 'Core programming fundamentals and engineering practices.',
    skills: ['Java', 'Python', 'Data Structures & Algorithms', 'OOP', 'Git', 'GitHub', 'Docker'],
    gridSpan: { base: 'col-span-1', md: 'col-span-1', lg: 'col-span-2' },
  },
  {
    title: 'Backend Development',
    icon: Server,
    description: 'Building REST APIs and backend services with Java and Python.',
    skills: ['Spring Boot', 'FastAPI', 'REST APIs', 'JPA / Hibernate', 'SQL', 'MySQL', 'PostgreSQL', 'API Integration', 'JWT Authentication'],
    gridSpan: { base: 'col-span-1', md: 'col-span-1', lg: 'col-span-2' },
  },
  {
    title: 'AI / ML',
    icon: Bot,
    description: 'Machine learning, deep learning, and computer vision applications.',
    skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'OpenCV', 'Scikit-learn', 'NumPy', 'Pandas'],
    gridSpan: { base: 'col-span-1', md: 'col-span-1', lg: 'col-span-2' },
  },
  {
    title: 'GenAI / Automation',
    icon: Brain,
    description: 'Large language models, RAG systems, and AI automation workflows.',
    skills: ['LLMs', 'RAG', 'AI Agents', 'Agentic AI', 'AI Automation', 'Prompt Engineering'],
    gridSpan: { base: 'col-span-1', md: 'col-span-1', lg: 'col-span-2' },
  },
  {
    title: 'Frontend Development',
    icon: Layout,
    description: 'Modern web applications with React and core web technologies.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    gridSpan: { base: 'col-span-1', md: 'col-span-1', lg: 'col-span-1' },
  },
  {
    title: 'Tools & Deployment',
    icon: Wrench,
    description: 'Development tools, version control, and deployment infrastructure.',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'VS Code'],
    gridSpan: { base: 'col-span-1', md: 'col-span-1', lg: 'col-span-1' },
  },
];

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <motion.div
          className="mb-16 md:mb-20"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl"
            variants={fadeUp}
            transition={transitionBase}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
            variants={fadeUp}
            transition={transitionBase}
          >
            Tools and technologies I use to build intelligent, production-ready systems.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {CATEGORIES.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
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
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_rgba(180,197,186,0.1)] ${category.gridSpan.base} ${category.gridSpan.md} ${category.gridSpan.lg}`}
    >
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-text">
            {category.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {category.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </motion.article>
  );
}

function SkillTag({ skill }: { skill: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-text-muted transition-all duration-200 hover:border-primary/20 hover:bg-white/[0.05] hover:text-text">
      {skill}
    </span>
  );
}
