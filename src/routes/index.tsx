import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CollegeHero } from "@/components/CollegeHero";
import { StatsStrip } from "@/components/StatsStrip";
import { FeaturedColleges } from "@/components/FeaturedColleges";
import { CourseExplorerPreview } from "@/components/CourseExplorerPreview";
import { FreeGuidance } from "@/components/FreeGuidance";
import { Features } from "@/components/Features";
import { Reviews } from "@/components/Reviews";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Find Your Perfect DU College — DU Science Hub" },
      {
        name: "description",
        content:
          "Search every Delhi University college. Compare courses, campus life, placements and student reviews — and talk to verified DU senior mentors over WhatsApp.",
      },
      { property: "og:title", content: "Find Your Perfect DU College — DU Science Hub" },
      {
        property: "og:description",
        content:
          "Explore DU colleges, courses, reviews and admission insights. Free guidance from senior mentors.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <CollegeHero />
        <StatsStrip />
        <FeaturedColleges />
        <CourseExplorerPreview />
        <FreeGuidance />
        <Features />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
