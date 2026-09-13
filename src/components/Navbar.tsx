import { useEffect, useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const menuId = useId();

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      const marker = 112;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) {
          current = `#${id}`;
        }
      }
      setActiveHref(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen]);

  const glassActive = scrolled || mobileOpen;

  return (
    <header
      className={`nav-bar${glassActive ? ' nav-bar--glass' : ''}${mobileOpen ? ' nav-bar--open' : ''}`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10" aria-label="Primary">
        <div className="flex h-20 items-center justify-between md:h-24 lg:h-28">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              window.history.pushState(null, '', window.location.pathname);
            }}
            className="nav-logo nav-enter nav-enter--1 font-heading"
          >
            Dheeraj
          </a>

          <ul className="hidden items-center gap-2 md:flex lg:gap-3">
            {NAV_LINKS.map((link, i) => (
              <li key={link.label} className={`nav-enter nav-enter--${i + 2}`}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = link.href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                      window.history.pushState(null, '', link.href);
                    }
                  }}
                  className={`nav-link${activeHref === link.href ? ' nav-link--active' : ''} font-body`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block nav-enter nav-enter--7">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById('contact');
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                  window.history.pushState(null, '', '#contact');
                }
              }}
              className="nav-cta font-body"
            >
              Let's Connect
              <ArrowUpRight className="nav-cta__icon" strokeWidth={2.25} />
            </a>
          </div>

          <button
            type="button"
            className="nav-burger md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="nav-burger__line" />
            <span className="nav-burger__line" />
            <span className="nav-burger__line" />
          </button>
        </div>
      </nav>

      <div
        id={menuId}
        className={`nav-overlay md:hidden${mobileOpen ? ' nav-overlay--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="nav-overlay__list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  const targetId = link.href.slice(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                    window.history.pushState(null, '', link.href);
                  }
                }}
                className={`nav-overlay__link${activeHref === link.href ? ' nav-overlay__link--active' : ''} font-body`}
                tabIndex={mobileOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                const targetElement = document.getElementById('contact');
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                  window.history.pushState(null, '', '#contact');
                }
              }}
              className="nav-cta nav-cta--block font-body"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Let's Connect
              <ArrowUpRight className="nav-cta__icon" strokeWidth={2.25} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
