import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Position refs for frame loop without React state re-renders on every pixel move
  const mouseRef   = useRef({ x: -100, y: -100 });
  const ringRef    = useRef({ x: -100, y: -100 });
  const isVisRef   = useRef(false); // mirror of isVisible as a ref to avoid effect re-runs

  const dotElRef  = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with hover capability & fine pointer (desktops)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);

    let lastHovered = false;
    let lastCardHovered = false;
    let lastTarget: EventTarget | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!isVisRef.current) {
        isVisRef.current = true;
        setIsVisible(true);
      }

      // Check hover only if target element changed
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const target = e.target as HTMLElement | null;
        if (target) {
          const isClickable = !!target.closest(
            'a, button, input, textarea, select, [role="button"], label, .group'
          );
          const isCard = !!target.closest('article, [data-cursor="card"]');

          if (isClickable !== lastHovered) {
            lastHovered = isClickable;
            setIsHovered(isClickable);
          }
          if (isCard !== lastCardHovered) {
            lastCardHovered = isCard;
            setIsCardHovered(isCard);
          }
        }
      }
    };

    const handleMouseDown  = () => setIsMouseDown(true);
    const handleMouseUp    = () => setIsMouseDown(false);
    const handleMouseLeave = () => { isVisRef.current = false; setIsVisible(false); };
    const handleMouseEnter = () => { isVisRef.current = true;  setIsVisible(true); };

    window.addEventListener('mousemove',  handleMouseMove,  { passive: true });
    window.addEventListener('mousedown',  handleMouseDown);
    window.addEventListener('mouseup',    handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // ── Animation Loop for Smooth Spring Trailing ──────────────────────────
    let animFrameId: number;
    let lastDotX = -999;
    let lastDotY = -999;
    let lastRingX = -999;
    let lastRingY = -999;

    const render = () => {
      animFrameId = requestAnimationFrame(render);

      const dx = mouseRef.current.x - ringRef.current.x;
      const dy = mouseRef.current.y - ringRef.current.y;

      ringRef.current.x += dx * 0.16;
      ringRef.current.y += dy * 0.16;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx !== lastDotX || my !== lastDotY) {
        lastDotX = mx;
        lastDotY = my;
        if (dotElRef.current) {
          dotElRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
        }
      }

      const rx = Math.round(ringRef.current.x * 10) / 10;
      const ry = Math.round(ringRef.current.y * 10) / 10;
      if (rx !== lastRingX || ry !== lastRingY) {
        lastRingX = rx;
        lastRingY = ry;
        if (ringElRef.current) {
          ringElRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
        }
      }
    };

    animFrameId = requestAnimationFrame(render);

    // Single cleanup — no deps means this runs once and never re-registers
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove',  handleMouseMove);
      window.removeEventListener('mousedown',  handleMouseDown);
      window.removeEventListener('mouseup',    handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []); // ← empty deps: registers once, never leaks

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
            ? 'scale-[1.7] border-primary bg-primary/20 shadow-[0_0_16px_rgba(180,197,186,0.3)]'
            : isHovered
            ? 'scale-[1.5] border-primary bg-primary/15'
            : isMouseDown
            ? 'scale-[0.85] border-primary/60 bg-primary/10'
            : 'scale-100 border-primary/45 bg-primary/5'
        }`}
      >
        {isCardHovered && (
          <ArrowUpRight className="h-3.5 w-3.5 text-text animate-pulse" />
        )}
      </div>

      {/* Main Solid Core Dot */}
      <div
        ref={dotElRef}
        className={`absolute top-0 left-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(180,197,186,0.9)] transition-transform duration-100 ease-out ${
          isMouseDown ? 'scale-[0.6]' : isHovered ? 'scale-[0.75]' : 'scale-100'
        }`}
      />
    </div>
  );
}
