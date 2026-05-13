"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  client: string;
  slot: string;
};

export function AdSenseUnit({ client, slot }: Props) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense scripts can fail silently.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
