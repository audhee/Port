import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Trophy,
  Star,
  FlaskConical,
  FileText,
  ShieldCheck,
  Code2,
  Target,
  ExternalLink,
} from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import {
  EASE_PREMIUM,
  VIEWPORT_ONCE,
  fadeUp,
  fadeUpScale,
  popIn,
  staggerContainer,
  transitionBase,
} from '@/lib/motion';

type Achievement = {
  title: string;
  description: string;
  icon: LucideIcon;
  featured: boolean;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: '1st Place — The Bug Hunt',
    description:
      'Secured 1st place in The Bug Hunt, a competitive debugging challenge involving Python, Java, and C.',
    icon: Trophy,
    featured: false,
  },
  {
    title: 'Best Performing Intern',
    description:
      'Recognized as the Best Performing Intern and retained with a paid internship offer based on performance.',
    icon: Star,
    featured: false,
  },
  {
    title: 'Maker Space Program',
    description:
      'Selected for an institution-backed R&D program supporting innovation, ideation, and project development.',
    icon: FlaskConical,
    featured: false,
  },
  {
    title: 'Research Publication',
    description:
      'Published the research paper "Transforming Public Administration Through Smart Civic Engagement in the Digital Age."',
    icon: FileText,
    featured: true,
  },
  {
    title: 'Patent Application Accepted — Real-Time AI-Based Surveillance System',
    description:
      'Loitering and unattended object detection using detector-tracker fusion and dwell-time analysis.',
    icon: ShieldCheck,
    featured: true,
  },
];

type CodingProfile = {
  platform: string;
  description: string;
  icon: LucideIcon;
  link: string;
  prefix: string;
  value: number;
  suffix: string;
};

const CODING_PROFILES: CodingProfile[] = [
  {
    platform: 'GeeksforGeeks',
    prefix: 'Institute Rank #',
    value: 101,
    suffix: '',
    description: 'Ranked #101 among students across the institute.',
    icon: Code2,
    link: 'https://www.geeksforgeeks.org',
  },
  {
    platform: 'LeetCode',
    prefix: '',
    value: 200,
    suffix: '+ Problems Solved',
    description: 'Solved 200+ problems across data structures and algorithms.',
    icon: Target,
    link: 'https://leetcode.com',
  },
];

export default function Achievements() {
  const reduceMotion = useReducedMotion();
  const featured = ACHIEVEMENTS.filter((a) => a.featured);
  const standard = ACHIEVEMENTS.filter((a) => !a.featured);

  return (
    <section id="achievements" className="relative bg-ink-bg px-6 py-24 md:px-10 md:py-32">
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
            Achievements
          </motion.span>
          <motion.h2
            className="mt-5 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl"
            variants={fadeUp}
            transition={transitionBase}
          >
            Proof of Work
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {featured.map((a) => (
            <AchievementCard key={a.title} achievement={a} featured />
          ))}
        </motion.div>

        <motion.div
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          {standard.map((a) => (
            <AchievementCard key={a.title} achievement={a} />
          ))}
        </motion.div>

        <div className="mt-20 md:mt-28">
          <motion.h3
            className="text-xl font-semibold tracking-tight text-ink-text md:text-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={transitionBase}
          >
            Coding Profiles
          </motion.h3>
          <motion.div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
          >
            {CODING_PROFILES.map((p) => (
              <CodingProfileCard key={p.platform} profile={p} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  achievement,
  featured = false,
}: {
  achievement: Achievement;
  featured?: boolean;
}) {
  const Icon = achievement.icon;

  return (
    <motion.article
      variants={fadeUpScale}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:border-ink-accent/60 hover:shadow-2xl hover:shadow-ink-accent/5 hover:-translate-y-1 md:p-8 ${
        featured
          ? 'border-ink-border bg-ink-border/[0.1]'
          : 'border-ink-border/60 bg-ink-border/[0.07]'
      }`}
    >
      <motion.div
        variants={popIn}
        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 group-hover:border-ink-accent/60 ${
          featured
            ? 'border-ink-accent/40 bg-ink-accent/10'
            : 'border-ink-border/60 bg-ink-border/10'
        }`}
      >
        <Icon
          className={`h-6 w-6 ${featured ? 'text-ink-accent' : 'text-ink-muted'} transition-colors duration-300 group-hover:text-ink-accent`}
        />
      </motion.div>

      <h3
        className={`mt-5 font-bold tracking-tight text-ink-text ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}
      >
        {achievement.title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-ink-muted">
        {achievement.description}
      </p>
    </motion.article>
  );
}

function CodingProfileCard({ profile }: { profile: CodingProfile }) {
  const Icon = profile.icon;
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp({
    end: profile.value,
    enabled: inView,
    duration: 1.35,
  });

  return (
    <motion.a
      ref={ref}
      href={profile.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUpScale}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className="group flex items-center gap-5 rounded-2xl border border-ink-border/60 bg-ink-border/[0.07] p-6 transition-all duration-300 hover:border-ink-accent/60 hover:bg-ink-border/[0.12] hover:shadow-lg hover:shadow-ink-accent/5 hover:-translate-y-1 md:p-7"
    >
      <motion.div
        variants={popIn}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink-border/60 bg-ink-border/10 transition-colors duration-300 group-hover:border-ink-accent/60"
      >
        <Icon className="h-6 w-6 text-ink-muted transition-colors duration-300 group-hover:text-ink-accent" />
      </motion.div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold tracking-tight text-ink-text">
            {profile.platform}
          </h4>
          <ExternalLink className="h-4 w-4 text-ink-muted transition-colors duration-300 group-hover:text-ink-accent" />
        </div>
        <p className="mt-0.5 text-base font-semibold text-ink-accent tabular-nums">
          {profile.prefix}
          {count}
          {profile.suffix}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {profile.description}
        </p>
      </div>
    </motion.a>
  );
}
