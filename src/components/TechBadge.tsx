import { useEffect, useRef, useState } from 'react';

interface TechBadgeProps {
  name: string;
  index: number;
}

export default function TechBadge({ name, index }: TechBadgeProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  // 1. Initial Staggered Entrance Reveal (100ms per badge)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsInitialized(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsInitialized(true);
          }, index * 100);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  // 2. Micro Magnetic Interaction (desktop hover only)
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) return;

    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * 2.5;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * 2.5;

    setMagneticPos({ x: offsetX, y: offsetY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticPos({ x: 0, y: 0 });
  };

  // Idle animation delay per badge: Java (0s), Python (0.4s), AI Automation (0.8s), etc.
  const idleDelaySec = `${index * 0.4}s`;
  const circuitDelaySec = `${index * 0.5}s`;

  return (
    <span
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isInitialized
          ? `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`
          : 'translate3d(0, 15px, 0) scale(0.96)',
        opacity: isInitialized ? 1 : 0,
        animationDelay: idleDelaySec,
      }}
      className={`group relative inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-text-muted overflow-hidden select-none cursor-default transition-all duration-300 ease-out ${
        isInitialized ? 'tech-badge-idle' : ''
      } hover:scale-[1.05] hover:-translate-y-[3px] hover:border-primary hover:bg-primary/10 hover:text-white hover:shadow-[0_0_22px_rgba(180,197,186,0.38)]`}
    >
      {/* ── Traveling Circuit Signal Highlight Line (Continuous) ── */}
      <span
        style={{ animationDelay: circuitDelaySec }}
        className="circuit-signal-line pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60"
      />

      {/* ── Ambient Radial Glow Aura on Hover ── */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(180,197,186,0.35)_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

      {/* ── Left-to-Right Hover Shimmer Sweep ── */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* ── Technology Name Label ── */}
      <span className="relative z-10 font-semibold tracking-wide transition-colors duration-200 group-hover:text-white">
        {name}
      </span>
    </span>
  );
}
