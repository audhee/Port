import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import {
  VIEWPORT_ONCE,
  chipItem,
  fadeUp,
  staggerContainer,
  transitionBase,
} from '@/lib/motion';

type Project = {
  title: string;
  subtitle: string;
  description: string;
  caseStudy: string;
  tech: string[];
  link: string;
  accent: string;
  signal: string;
  metrics: string[];
};

const PROJECTS: Project[] = [
  {
    title: 'PG Decoded',
    subtitle: 'Freelancing Project',
    description:
      'A full-stack business solution for a Delhi-based client, blending operational workflows with AI-powered functionality in a modern web application.',
    caseStudy:
      'Built around practical client needs: structured data flows, responsive React views, Spring Boot services, and AI-assisted interactions that make the product feel useful instead of ornamental.',
    tech: ['Java', 'Spring Boot', 'React', 'Grok AI API'],
    link: 'https://github.com/audhee/PG_decoded',
    accent: '#a8c4a2',
    signal: 'Client System',
    metrics: ['AI workflow', 'Business ops', 'Full stack'],
  },
  {
    title: 'Smart Expense Tracker',
    subtitle: 'Personal Finance App',
    description:
      'A personal finance application for tracking income, expenses, spending behavior, and AI-powered recommendations.',
    caseStudy:
      'Designed as a finance cockpit: clean data modeling, MySQL persistence, category-level tracking, and recommendation flows that turn spending history into clearer next actions.',
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Groq AI', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/audhee/Smart_Expense_Tracker',
    accent: '#8fcdb2',
    signal: 'Finance Intelligence',
    metrics: ['Insights', 'MySQL', 'Recommendations'],
  },
  {
    title: 'Arohan',
    subtitle: 'AI Emergency Care App',
    description:
      'An emergency-care mobile app with SOS functionality, contact alerts, location sharing, and AI-powered voice guidance.',
    caseStudy:
      'The interface prioritizes speed and trust under pressure, while the backend coordinates location-aware alerts, communication services, and voice guidance for critical moments.',
    tech: ['React Native', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini', 'Twilio', 'PostgreSQL', 'Redis'],
    link: 'https://github.com/audhee/Signalburn',
    accent: '#b4c99a',
    signal: 'Emergency Mesh',
    metrics: ['SOS', 'Voice guide', 'Realtime'],
  },
  {
    title: 'IntelliMed',
    subtitle: 'AI-Powered Longitudinal Health Intelligence',
    description:
      'A platform that transforms medical reports into structured health data, normalized biomarkers, trend analysis, and intelligent insights.',
    caseStudy:
      'Combines OCR, vision models, asynchronous processing, and longitudinal data design to turn static health reports into an evolving clinical timeline.',
    tech: ['React Native', 'FastAPI', 'Python', 'Gemini Vision', 'Celery', 'Redis', 'PostgreSQL'],
    link: 'https://github.com/audhee/IntelliMed',
    accent: '#9ebfaf',
    signal: 'Health Timeline',
    metrics: ['OCR', 'Trends', 'Async AI'],
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.04, 0.28, 0.7, 1], [0, 1, 0.82, 0]);
  const titleScale = useTransform(scrollYProgress, [0.04, 0.62, 1], [0.68, 1.08, 0.9]);
  const titleY = useTransform(scrollYProgress, [0.04, 0.62, 1], [48, 0, -72]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.44, 1], [0, 0.72, 0.2]);
  const progressScaleX = useTransform(scrollYProgress, [0.02, 0.95], [0, 1]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d100d] text-text"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(180,197,186,0.14),transparent_34%),linear-gradient(180deg,#0E120F_0%,#0d100d_34%,#111612_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(229,235,231,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(229,235,231,0.8)_1px,transparent_1px)] [background-size:88px_88px]" />

      <div className="relative h-[112vh] sm:h-[118vh] md:h-[124vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,197,186,0.22),rgba(180,197,186,0.08)_42%,transparent_70%)] blur-3xl"
            style={reduceMotion ? undefined : { opacity: glowOpacity }}
          />
          <motion.div
            className="relative z-10 text-center"
            style={reduceMotion ? undefined : { opacity: titleOpacity, scale: titleScale, y: titleY }}
          >
            <span className="mx-auto mb-5 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_18px_rgba(180,197,186,0.85)]" />
              New Chapter
            </span>
            <h2 className="text-5xl font-bold tracking-normal text-text sm:text-6xl md:text-8xl tracking-tight-heading">
              Selected Work
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Some of my works are like :)
            </p>
          </motion.div>

          <div
            className="absolute bottom-10 left-1/2 z-10 h-px w-28 -translate-x-1/2 overflow-hidden rounded-full bg-white/[0.08] sm:bottom-12 sm:w-36"
            aria-hidden="true"
          >
            <motion.div
              className="h-full origin-left bg-primary shadow-[0_0_18px_rgba(180,197,186,0.8)]"
              style={reduceMotion ? undefined : { scaleX: progressScaleX }}
            />
          </div>
          <motion.span
            className="absolute bottom-9 left-1/2 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_rgba(180,197,186,0.9)] sm:bottom-11"
            style={reduceMotion ? undefined : { opacity: titleOpacity }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-[34vh] pb-24 sm:-mt-[36vh] md:-mt-[38vh] md:pb-32">
        {PROJECTS.map((project, index) => (
          <ProjectStory
            key={project.title}
            project={project}
            index={index}
            align={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectStory({
  project,
  index,
  align,
}: {
  project: Project;
  index: number;
  align: 'left' | 'right';
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.035, 0.98]);
  const imageY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const textX = useTransform(
    scrollYProgress,
    [0.12, 0.45],
    [align === 'left' ? -48 : 48, 0]
  );
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.42], [0, 1]);

  const visual = (
    <motion.div
      className="relative"
      style={reduceMotion || !isDesktop ? undefined : { scale: imageScale, y: imageY }}
    >
      <ProjectVisual project={project} index={index} />
    </motion.div>
  );

  const copy = (
    <motion.div
      className="relative flex flex-col justify-center"
      style={reduceMotion || !isDesktop ? undefined : { opacity: textOpacity, x: textX }}
    >
      <div
        className="pointer-events-none absolute -top-16 right-0 text-[8rem] font-bold leading-none text-text/[0.045] sm:text-[11rem] md:-right-8 md:text-[14rem]"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
      >
        <motion.span
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
          variants={fadeUp}
          transition={transitionBase}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {project.subtitle}
        </motion.span>
        <motion.h3
          className="mt-5 text-3xl font-bold leading-tight tracking-normal text-text sm:text-4xl md:text-5xl tracking-tight-heading"
          variants={fadeUp}
          transition={transitionBase}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          variants={fadeUp}
          transition={transitionBase}
        >
          {project.description}
        </motion.p>
        <motion.p
          className="mt-4 max-w-xl border-l border-primary/35 pl-5 text-sm leading-relaxed text-text-muted/80 sm:text-base"
          variants={fadeUp}
          transition={transitionBase}
        >
          {project.caseStudy}
        </motion.p>

        <motion.div className="mt-7 flex flex-wrap gap-2.5" variants={staggerContainer}>
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              variants={chipItem}
              className="rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-text shadow-[0_0_18px_rgba(180,197,186,0.10)]"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          variants={fadeUp}
          transition={transitionBase}
        >
          <ProjectLink href={project.link} label="View Project" primary />
          <ProjectLink href={project.link} label="GitHub" icon="github" />
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <article
      ref={ref}
      className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-14 md:px-10 md:py-28"
    >
      {align === 'left' ? (
        <>
          {copy}
          {visual}
        </>
      ) : (
        <>
          <div className="md:order-2">{copy}</div>
          <div className="md:order-1">{visual}</div>
        </>
      )}
    </article>
  );
}

function ProjectLink({
  href,
  label,
  primary = false,
  icon,
}: {
  href: string;
  label: string;
  primary?: boolean;
  icon?: 'github';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? 'group inline-flex items-center justify-center gap-2 rounded-full border border-primary/70 bg-primary px-5 py-3 text-sm font-bold text-bg shadow-[0_0_28px_rgba(180,197,186,0.16)] transition-all duration-300 hover:border-primary hover:bg-[#C5D4CB] hover:shadow-[0_0_34px_rgba(180,197,186,0.34)]'
          : 'group inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-surface/80 px-5 py-3 text-sm font-bold text-text transition-all duration-300 hover:border-primary/80 hover:text-primary hover:shadow-[0_0_26px_rgba(180,197,186,0.16)]'
      }
    >
      {icon === 'github' ? <Github className="h-4 w-4" /> : null}
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </a>
  );
}

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -10);
    rotateY.set(x * 12);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="group relative mx-auto aspect-[1.06] w-full max-w-[34rem] [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div
        className="absolute -inset-6 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: `radial-gradient(circle, ${project.accent}33, transparent 66%)`,
        }}
      />
      <motion.div
        className="relative h-full overflow-hidden rounded-[1.75rem] border border-primary/25 bg-[#0b0f0c] shadow-[0_32px_90px_rgba(0,0,0,0.44)] [transform-style:preserve-3d]"
        style={reduceMotion ? undefined : { rotateX: springX, rotateY: springY }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(circle at 20% 18%, ${project.accent}24, transparent 30%), radial-gradient(circle at 76% 72%, ${project.accent}18, transparent 36%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(236,237,230,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(236,237,230,0.85)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative flex h-full flex-col p-5 sm:p-6" style={{ transform: 'translateZ(34px)' }}>
          <div className="flex items-center justify-between border-b border-primary/15 pb-4">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: dot === 0 ? project.accent : 'rgba(195,199,179,0.22)' }}
                />
              ))}
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-text-muted">
              {project.signal}
            </span>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 pt-5 sm:grid-cols-[1fr_0.78fr]">
            <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-black/20 p-4">
              <div className="absolute left-5 top-5 h-24 w-24 rounded-full border border-primary/25" />
              <div className="absolute left-16 top-20 h-36 w-36 rounded-full border border-primary/10" />
              <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full border border-primary/20" />
              <div className="relative h-full">
                {Array.from({ length: 8 }).map((_, item) => (
                  <span
                    key={item}
                    className="absolute h-1.5 w-1.5 rounded-full shadow-[0_0_14px_currentColor]"
                    style={{
                      left: `${18 + ((item * 19 + index * 7) % 68)}%`,
                      top: `${14 + ((item * 23 + index * 11) % 70)}%`,
                      color: project.accent,
                    }}
                  />
                ))}
                <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <line x1="24%" y1="28%" x2="58%" y2="42%" stroke={project.accent} strokeOpacity="0.24" />
                  <line x1="58%" y1="42%" x2="76%" y2="68%" stroke={project.accent} strokeOpacity="0.18" />
                  <line x1="30%" y1="72%" x2="58%" y2="42%" stroke={project.accent} strokeOpacity="0.2" />
                  <line x1="22%" y1="52%" x2="74%" y2="26%" stroke={project.accent} strokeOpacity="0.12" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 rounded-2xl border border-primary/15 bg-[#101511]/88 p-4 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">System Focus</p>
                  <p className="mt-2 text-lg font-bold leading-tight text-text">{project.title}</p>
                </div>
              </div>
            </div>

            <div className="hidden flex-col gap-3 sm:flex">
              {project.metrics.map((metric, metricIndex) => (
                <div
                  key={metric}
                  className="rounded-2xl border border-primary/15 bg-primary/10 p-3"
                >
                  <div className="mb-3 flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-[0.14em] text-text-muted/70">
                    <span>{metric}</span>
                    <span>{String(metricIndex + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/30">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${64 + metricIndex * 12}%`,
                        background: `linear-gradient(90deg, ${project.accent}, rgba(236,237,230,0.88))`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-auto rounded-2xl border border-primary/15 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted/70">Open Repo</span>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div className="mt-4 grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 15 }).map((_, cell) => (
                    <span
                      key={cell}
                      className="aspect-square rounded-[0.25rem]"
                      style={{
                        backgroundColor:
                          (cell + index) % 4 === 0 ? project.accent : 'rgba(140,168,136,0.14)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return isDesktop;
}
