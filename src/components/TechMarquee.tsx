import { motion, useReducedMotion } from 'framer-motion';
import {
  EASE_PREMIUM,
  VIEWPORT_ONCE,
  fadeUp,
  staggerContainer,
  transitionBase,
} from '@/lib/motion';

const SKILLS = [
  'JAVA',
  'PYTHON',
  'AI AUTOMATION',
  'AI AGENTS',
  'REACT',
  'SPRING BOOT',
] as const;

const COPIES = 3;

function SkillPills({ hidden }: { hidden?: boolean }) {
  const items = Array.from({ length: COPIES }, () => SKILLS).flat();

  return (
    <div className="tech-marquee__group" aria-hidden={hidden || undefined}>
      {items.map((skill, i) => (
        <span key={`${hidden ? 'dup' : 'main'}-${skill}-${i}`} className="contents">
          <span className="tech-marquee__pill">{skill}</span>
          <span className="tech-marquee__dot" aria-hidden>
            •
          </span>
        </span>
      ))}
    </div>
  );
}

function MarqueeRow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <div className={`tech-marquee__track tech-marquee__track--${direction}`}>
      <SkillPills />
      <SkillPills hidden />
    </div>
  );
}

export default function TechMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="tech-marquee"
      aria-label="Tech stack"
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer}
    >
      <motion.p
        className="tech-marquee__label"
        variants={fadeUp}
        transition={transitionBase}
      >
        <span className="tech-marquee__label-dot" aria-hidden>
          •
        </span>
        Tech Stack
        <span className="tech-marquee__label-dot" aria-hidden>
          •
        </span>
      </motion.p>

      <div className="tech-marquee__viewport">
        <div className="tech-marquee__rows">
          {(['left', 'right'] as const).map((direction, i) => (
            <motion.div
              key={direction}
              variants={fadeUp}
              transition={{
                duration: 0.7,
                ease: EASE_PREMIUM,
                delay: reduceMotion ? 0 : 0.08 + i * 0.1,
              }}
            >
              <MarqueeRow direction={direction} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
