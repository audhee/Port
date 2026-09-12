import { useEffect, useState } from 'react';

type Options = {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
  decimals?: number;
};

/** Counts from `start` to `end` once when `enabled` becomes true. */
export function useCountUp({
  end,
  duration = 1.4,
  start = 0,
  enabled = false,
  decimals = 0,
}: Options): number {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setValue(end);
      return;
    }

    let frame = 0;
    const t0 = performance.now();
    const ms = duration * 1000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = start + (end - start) * eased;
      setValue(
        decimals > 0
          ? Number(next.toFixed(decimals))
          : Math.round(next)
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, end, start, duration, decimals]);

  return value;
}
