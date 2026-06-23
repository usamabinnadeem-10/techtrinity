import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { SiteFooter } from "@/components/home/site-footer";
import { NotFoundHero } from "@/components/not-found/not-found-hero";

// Root not-found handles every unmatched URL across the app. Next injects a
// `noindex` robots tag and the correct 404 status automatically.
export default function NotFound() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main className="flex flex-1 flex-col">
        <NotFoundHero />
      </main>
      <SiteFooter />
    </>
  );
}
