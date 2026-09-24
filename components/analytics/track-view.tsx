"use client";

import { useEffect } from "react";
import { trackOnce, type AnalyticsEvent } from "@/lib/analytics";

type Props = {
  event: Extract<AnalyticsEvent, "service_view" | "case_study_view">;
  slug: string;
};

/** Fires a one-shot view event for a service or case-study page. */
export function TrackView({ event, slug }: Props) {
  useEffect(() => {
    trackOnce(event, slug, { slug });
  }, [event, slug]);
  return null;
}
