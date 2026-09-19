import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/audhee', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dheeraj-a-u-05bbba334/',
    icon: Linkedin,
  },
  { label: 'Instagram', href: 'https://instagram.com/dheeraj_a_u/', icon: Instagram },
];

const EMAIL = 'audheeraj875@gmail.com';

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg px-6 pt-24 pb-12 md:px-10 md:pt-32">
      {/* Top divider */}
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Contact content */}
      <div className="mx-auto max-w-4xl pt-20 md:pt-28">
        {/* Section header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Contact
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl text-balance">
            Let's Build Something Useful...
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary text-balance">
            Have an idea, project, or workflow that could be improved with
            software or AI? I'd love to hear about it.
          </p>
        </div>

        {/* CTA button */}
        <div className="mt-10 flex justify-center">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-bg transition-all duration-300 hover:bg-[#C5D4CB] hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            Get In Touch
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Contact icon links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {SOCIALS.map((s) => (
            <ContactIconLink key={s.label} social={s} />
          ))}
          <ContactIconLink
            social={{
              label: 'Email',
              href: `mailto:${EMAIL}`,
              icon: Mail,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-24 max-w-6xl md:mt-32">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="flex flex-col items-center gap-8 pt-12 pb-10 md:pt-16">
          {/* Name + tagline */}
          <div className="text-center">
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
              className="text-2xl font-bold tracking-tight text-text transition-colors duration-300 hover:text-primary"
            >
              Dheeraj
            </a>
            <p className="mt-2 text-sm text-text-muted">
              AI/ML Engineering Student · Builder · Problem Solver
            </p>
          </div>

          {/* Minimal social icons */}
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-text-muted transition-colors duration-300 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Bottom line */}
          <p className="text-center text-xs text-text-muted/70">
            © 2026 Dheeraj. Built with curiosity and code.
          </p>
        </div>
      </footer>
    </section>
  );
}

function ContactIconLink({ social }: { social: SocialLink }) {
  const Icon = social.icon;
  const isExternal = !social.href.startsWith('mailto:');

  return (
    <a
      href={social.href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-surface/[0.07] px-5 py-2.5 text-sm font-medium text-text-muted transition-all duration-300 hover:border-primary/30 hover:text-text hover:-translate-y-0.5"
    >
      <Icon className="h-4.5 w-4.5 text-text-muted transition-colors duration-300 group-hover:text-primary" />
      {social.label}
    </a>
  );
}
