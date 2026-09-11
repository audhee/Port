import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-bg/80 backdrop-blur-xl border-b border-ink-border/40 shadow-[0_1px_20px_-12px_rgba(0,0,0,0.5)]'
          : 'bg-ink-bg border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-ink-text transition-colors duration-300 hover:text-ink-accent"
          >
            Dheeraj
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative px-4 py-2 text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-ink-text"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-ink-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink-accent px-5 py-2.5 text-sm font-semibold text-ink-bg transition-all duration-300 hover:bg-ink-accent/90 hover:shadow-lg hover:shadow-ink-accent/20 hover:-translate-y-0.5"
            >
              Let's Connect
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col items-end gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 rounded-full bg-ink-text transition-all duration-300 ${
                mobileOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-ink-text transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-ink-text transition-all duration-300 ${
                mobileOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-ink-border/40 bg-ink-bg/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-ink-muted transition-colors duration-200 hover:bg-ink-border/20 hover:text-ink-text"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-ink-accent px-5 py-3 text-base font-semibold text-ink-bg"
            >
              Let's Connect
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
