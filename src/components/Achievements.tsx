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
  staggerFast,
} from '@/lib/motion';

type AchievementCategory = 'PUBLICATION' | 'PATENT' | 'AWARD' | 'PROGRAM' | 'COMPETITION';

type Achievement = {
  title: string;
  description: string;
  icon: LucideIcon;
  featured: boolean;
  category: AchievementCategory;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: '1st Place — The Bug Hunt',
    description:
      'Secured 1st place in The Bug Hunt, a competitive debugging challenge involving Python, Java, and C.',
    icon: Trophy,
    featured: false,
    category: 'COMPETITION',
  },
  {
    title: 'Best Performing Intern',
    description:
      'Recognized as the Best Performing Intern and retained with a paid internship offer based on performance.',
    icon: Star,
    featured: false,
    category: 'AWARD',
  },
  {
    title: 'Maker Space Program',
    description:
      'Selected for an institution-backed R&D program supporting innovation, ideation, and project development.',
    icon: FlaskConical,
    featured: false,
    category: 'PROGRAM',
  },
  {
    title: 'Research Publication',
    description:
      'Published the research paper "Transforming Public Administration Through Smart Civic Engagement in the Digital Age."',
    icon: FileText,
    featured: true,
    category: 'PUBLICATION',
  },
  {
    title: 'Patent Application Accepted — Real-Time AI-Based Surveillance System',
    description:
      'Loitering and unattended object detection using detector-tracker fusion and dwell-time analysis.',
    icon: ShieldCheck,
    featured: true,
    category: 'PATENT',
  },
];

const CATEGORY_COLORS: Record<AchievementCategory, { glow: string; badge: string; text: string }> = {
  PUBLICATION: { glow: 'from-blue-400/20 to-emerald-400/20', badge: 'from-blue-500/30 to-emerald-500/30', text: 'text-blue-400' },
  PATENT: { glow: 'from-amber-400/20 to-orange-400/20', badge: 'from-amber-500/30 to-orange-500/30', text: 'text-amber-400' },
  AWARD: { glow: 'from-emerald-400/20 to-teal-400/20', badge: 'from-emerald-500/30 to-teal-500/30', text: 'text-emerald-400' },
  PROGRAM: { glow: 'from-cyan-400/20 to-blue-400/20', badge: 'from-cyan-500/30 to-blue-500/30', text: 'text-cyan-400' },
  COMPETITION: { glow: 'from-purple-400/20 to-pink-400/20', badge: 'from-purple-500/30 to-pink-500/30', text: 'text-purple-400' },
};

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
    <section id="achievements" className="relative bg-ink-bg px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-8 md:mb-10"
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
            Achievements
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight text-ink-text sm:text-4xl md:text-5xl font-heading tracking-tight-heading"
            variants={fadeUp}
            transition={transitionBase}
          >
            Proof of Work
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerFast}
        >
          {featured.map((a) => (
            <AchievementCard key={a.title} achievement={a} featured />
          ))}
          {standard.map((a) => (
            <AchievementCard key={a.title} achievement={a} />
          ))}
        </motion.div>

        <div className="mt-12 md:mt-16">
          <motion.h3
            className="text-xl font-semibold tracking-tight text-ink-text md:text-2xl font-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={transitionBase}
          >
            Coding Profiles
          </motion.h3>
          <motion.div
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerFast}
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
  const colors = CATEGORY_COLORS[achievement.category];

  return (
    <motion.article
      variants={fadeUpScale}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 md:p-7 ${
        featured
          ? 'col-span-1 md:col-span-3 border-ink-border/80 bg-ink-border/[0.12]'
          : 'col-span-1 md:col-span-2 border-ink-border/60 bg-ink-border/[0.08]'
      }`}
      style={{
        boxShadow: featured
          ? '0 4px 24px -8px rgba(0, 0, 0, 0.4)'
          : '0 2px 16px -6px rgba(0, 0, 0, 0.3)',
      }}
      whileHover={{
        boxShadow: featured
          ? '0 8px 32px -8px rgba(140, 168, 136, 0.15)'
          : '0 4px 24px -6px rgba(140, 168, 136, 0.1)',
        borderColor: featured ? 'rgba(140, 168, 136, 0.5)' : 'rgba(140, 168, 136, 0.4)',
      }}
    >
      {featured && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(140, 168, 136, 0.1), transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          whileHover={{ opacity: 1 }}
        />
      )}

      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative">
        <motion.span
          className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] ${colors.text} mb-3 font-body`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {achievement.category}
        </motion.span>

        <motion.div
          variants={popIn}
          className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-gradient-to-br ${colors.badge} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
            featured ? 'border-ink-border/40' : 'border-ink-border/30'
          }`}
          whileHover={{
            boxShadow: `0 0 24px ${colors.text.replace('text-', '')}40`,
          }}
        >
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          />
          <Icon
            className={`relative h-8 w-8 ${colors.text} transition-colors duration-300`}
          />
        </motion.div>

        <h3
          className={`mt-5 font-bold tracking-tight text-ink-text font-heading ${
            featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          {achievement.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted md:text-base font-body">
          {achievement.description}
        </p>
      </div>
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
      className="group relative flex items-center gap-5 rounded-2xl border border-ink-border/60 bg-ink-border/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 md:p-7"
      style={{
        boxShadow: '0 2px 16px -6px rgba(0, 0, 0, 0.3)',
      }}
      whileHover={{
        boxShadow: '0 4px 24px -6px rgba(140, 168, 136, 0.1)',
        borderColor: 'rgba(140, 168, 136, 0.4)',
        backgroundColor: 'rgba(78, 96, 70, 0.12)',
      }}
    >
      <motion.div
        variants={popIn}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ink-border/40 bg-gradient-to-br from-ink-accent/20 to-ink-accent/10 transition-all duration-300 group-hover:scale-110 group-hover:border-ink-accent/60"
        whileHover={{
          boxShadow: '0 0 24px rgba(140, 168, 136, 0.3)',
        }}
      >
        <Icon className="h-7 w-7 text-ink-accent transition-colors duration-300" />
      </motion.div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold tracking-tight text-ink-text">
            {profile.platform}
          </h4>
          <ExternalLink className="h-4 w-4 text-ink-muted transition-colors duration-300 group-hover:text-ink-accent" />
        </div>
        <p className="mt-1 text-base font-semibold text-ink-accent tabular-nums">
          {profile.prefix}
          {count}
          {profile.suffix}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {profile.description}
        </p>
      </div>
    </motion.a>
  );
}
