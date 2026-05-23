import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Plans } from "@/components/Plans";
import { Reviews } from "@/components/Reviews";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DU Science Hub — Real College Reviews. Smarter DU Admissions." },
      {
        name: "description",
        content:
          "Honest student reviews of Delhi University colleges, CUET cutoff insights, and 1:1 admission guidance from real DU seniors. Plan your DU admission smarter.",
      },
      { property: "og:title", content: "DU Science Hub — Real DU Reviews & Admission Help" },
      { property: "og:description", content: "Verified DU student reviews, cutoffs and 1:1 counselling." },
      { property: "og:type", content: "website" },
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
        <Hero />
        <Features />
        <Plans />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
