/**
 * Data attributes that opt an element into `cta_click` tracking via the
 * global `CtaClickTracker`. Spread onto any link or button:
 *   <a href={BOOK_HREF} {...ctaAttrs("Book a Workflow Review", "hero")}>
 */
export type CtaTracking = {
  label: string;
  section: string;
  service?: string;
};

export function ctaAttrs(
  label: string,
  section: string,
  service?: string,
): Record<string, string> {
  return {
    "data-cta-label": label,
    "data-cta-section": section,
    ...(service ? { "data-cta-service": service } : {}),
  };
}
