/**
 * Light/dark toggle. Both icons are rendered; CSS shows the right one for the
 * current theme, so server and client markup always match.
 *
 * The switch is a single cross-fade of the whole page (View Transitions API), so
 * everything — background, text, the hero photo and its fades — changes together.
 * Browsers without the API, or with reduced motion on, switch instantly.
 */
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* storage unavailable: theme still changes for this page view */
      }
    };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduceMotion) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle} aria-label="Switch between light and dark mode">
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
