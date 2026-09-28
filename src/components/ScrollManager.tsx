import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// In-memory cache for scroll positions across routes
const scrollPositions = new Map<string, number>();

/**
 * Initializes manual scroll restoration so the browser doesn't execute
 * uncontrolled jumps during animated route transitions.
 */
export function ScrollManagerInit() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Continuously record scroll position for the current path
  useEffect(() => {
    const handleScroll = () => {
      const key = location.pathname + location.search;
      scrollPositions.set(key, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.search]);

  return null;
}

/**
 * Placed inside the entering page's motion container so it fires
 * exactly when the new page mounts (after the old page has finished exiting).
 * This guarantees the exiting page never suffers a jarring scroll jump.
 */
export function PageScrollHandler() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    // If navigating to an anchor hash (e.g. #logistics)
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const key = location.pathname + location.search;

    if (navigationType === 'POP') {
      // User navigated back/forward - restore their previous position
      const savedY = scrollPositions.get(key) ?? 0;
      window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
    } else {
      // User navigated forward to a new page (PUSH)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.search, location.hash, navigationType]);

  return null;
}
