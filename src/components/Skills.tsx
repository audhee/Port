import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Settings2,
  Server,
  Bot,
  Brain,
  Atom,
  Wrench,
} from 'lucide-react';

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
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
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-ink-bg px-6 py-24 md:px-10 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-ink-accent/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
            Skills
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl">
            What I Work With
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted text-balance">
            A toolkit spanning software engineering, backend systems, AI/ML, and
            the glue that ships products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <article
                key={category.title}
                style={{ transitionDelay: visible ? `${index * 70}ms` : '0ms' }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.055] via-white/[0.02] to-transparent p-6 backdrop-blur-sm transition-all duration-500 ease-out md:p-7 ${category.accent.border} ${category.accent.glow} hover:-translate-y-1 ${
                  visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${category.accent.iconBg} ${category.accent.iconText} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.1} />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-ink-text">
                    {category.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <span
                        className={`inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium tracking-wide text-ink-muted transition-all duration-300 hover:scale-[1.04] ${category.accent.chipHover}`}
                      >
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
