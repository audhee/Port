import { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Position refs for frame loop without React state re-renders on every pixel move
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  
  const dotElRef = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with hover capability & fine pointer (desktops)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          'a, button, input, textarea, select, [role="button"], label, .group'
        );
        const isCard = !!target.closest('article, [data-cursor="card"]');

        setIsHovered(isClickable);
        setIsCardHovered(isCard);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // ── Animation Loop for Smooth Spring Trailing ──────────────────────────
    let animFrameId: number;

    const render = () => {
      animFrameId = requestAnimationFrame(render);

      // Lag/Spring interpolation for outer ring (0.16 factor for silky lag)
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.16;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.16;

      // Update dot transform directly
      if (dotElRef.current) {
        const x = mouseRef.current.x;
        const y = mouseRef.current.y;
        dotElRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }

      // Update ring transform directly
      if (ringElRef.current) {
        const rx = ringRef.current.x;
        const ry = ringRef.current.y;
        ringElRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer Spring Trailing Ring */}
      <div
        ref={ringElRef}
        className={`absolute top-0 left-0 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ease-out ${
          isCardHovered
            ? 'scale-[1.7] border-ink-accent bg-ink-accent/20 shadow-[0_0_16px_rgba(140,168,136,0.3)]'
            : isHovered
            ? 'scale-[1.5] border-ink-accent bg-ink-accent/15'
            : isMouseDown
            ? 'scale-[0.85] border-ink-accent/60 bg-ink-accent/10'
            : 'scale-100 border-ink-accent/45 bg-ink-accent/5'
        }`}
      >
        {/* Small arrow icon inside outer ring when hovering project cards */}
        {isCardHovered && (
          <ArrowUpRight className="h-3.5 w-3.5 text-ink-text animate-pulse" />
        )}
      </div>

      {/* Main Solid Core Dot */}
      <div
        ref={dotElRef}
        className={`absolute top-0 left-0 h-2 w-2 rounded-full bg-ink-accent shadow-[0_0_8px_rgba(140,168,136,0.9)] transition-transform duration-100 ease-out ${
          isMouseDown ? 'scale-[0.6]' : isHovered ? 'scale-[0.75]' : 'scale-100'
        }`}
      />
    </div>
  );
}
