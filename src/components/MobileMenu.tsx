import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  links: { label: string; href: string }[];
  resumeHref: string;
}

/**
 * Round menu button + full-screen sheet, shown on narrow screens only (see TopBar CSS).
 * The sheet is rendered into <body> (a portal) so no parent style — e.g. the top bar's
 * backdrop blur once scrolled — can trap or clip it. Sheet styles live in global.css.
 */
export default function MobileMenu({ links, resumeHref }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    // Lets the top bar show in full while the menu is open (see TopBar.astro).
    document.querySelector('.topbar')?.toggleAttribute('data-menu-open', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="icon-btn menu-btn"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <span className={open ? 'bars bars-open' : 'bars'} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      {mounted &&
        createPortal(
          <div id="mobile-menu" className="mobile-sheet" hidden={!open}>
            <nav aria-label="Mobile">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href={resumeHref} onClick={() => setOpen(false)}>
                Resume
              </a>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
