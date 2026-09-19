import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ── Scroll Restoration Fix ──────────────────────────────────────────────────
// Must run BEFORE React mounts so the browser cannot restore a stale position.
//
// The browser's native scroll restoration fires after JS during page load, so
// we disable it first, then force top — but ONLY when there is no intentional
// hash in the URL (e.g. /#skills should still scroll to that anchor).

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const hasHash = window.location.hash.length > 1; // e.g. "#skills"

if (!hasHash) {
  // Instant jump — no smooth animation on load
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

  // Reset before unload so the browser saves 0,0 if it tries to save scroll
  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  // Handle pageshow (including bfcache or navigation reload)
  window.addEventListener('pageshow', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  });

  // Fallback: some browsers (Firefox, Safari) restore scroll AFTER JS runs.
  // The 'load' event fires after all resources are parsed, catching late restores.
  window.addEventListener('load', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, { once: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
