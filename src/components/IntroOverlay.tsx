import { useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'exiting' | 'done';

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>('idle');
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Lock body scroll while intro is active
    document.body.style.overflow = 'hidden';

    const triggerExit = () => {
      if (hasTriggered.current) return;
      hasTriggered.current = true;
      setPhase('exiting');

      // After the CSS transition finishes, remove overlay & re-enable scroll
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 950);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) triggerExit();
    };

    const handleTouch = () => triggerExit();

    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowDown', ' ', 'Enter'].includes(e.key)) triggerExit();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  const isExiting = phase === 'exiting';

  return (
    <div
      className={`intro-overlay${isExiting ? ' intro-overlay--exit' : ''}`}
      aria-hidden="true"
    >
      {/* Subtle radial glow behind the name */}
      <div className="intro-glow" />

      {/* Name */}
      <div className={`intro-name${isExiting ? ' intro-name--exit' : ''}`}>
        DHEERAJ A U
      </div>

      {/* Scroll hint */}
      <div className={`intro-hint${isExiting ? ' intro-hint--exit' : ''}`}>
        <span className="intro-hint__label">Scroll to enter</span>
        <svg
          className="intro-hint__arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </div>
  );
}
