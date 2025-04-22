import { useEffect } from "react";

interface UseIntersectionObserverProps {
  target: React.RefObject<Element> | null;
  onIntersect: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

export function useIntersectionObserver({
  target,
  onIntersect,
  root = null,
  rootMargin = "0px",
  threshold = 0,
  enabled = true,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled) return;
    const el = target?.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [target, onIntersect, root, rootMargin, threshold, enabled]);
}
