import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

/**
 * Public read-only server functions for the DU Science Hub data layer.
 * Uses the server publishable client (anon role) — Cloudflare Worker safe,
 * no service-role key, RLS enforced.
 */
function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export type CollegeRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  streams: string[];
  categories: string[];
  popular_courses: string[];
  established: string | null;
  college_type: string | null;
  academics_rating: string;
  campus_life_rating: string;
  placements_rating: string;
  faculty_rating: string;
  hero_image_url: string | null;
};

export type ReviewRow = {
  id: string;
  college_name: string;
  author_name: string;
  course: string | null;
  rating: number;
  body: string;
  created_at: string;
};

export type MentorRow = {
  id: string;
  name: string;
  college_slug: string | null;
  college_name: string | null;
  course: string | null;
  year: string | null;
  whatsapp: string | null;
  photo_url: string | null;
  bio: string | null;
};

export const listColleges = createServerFn({ method: "GET" }).handler(
  async (): Promise<CollegeRow[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("colleges")
      .select(
        "id, slug, name, short_description, streams, categories, popular_courses, established, college_type, academics_rating, campus_life_rating, placements_rating, faculty_rating, hero_image_url",
      )
      .order("name");
    if (error) {
      console.error("[listColleges]", error);
      return [];
    }
    return (data ?? []) as CollegeRow[];
  },
);

export const getCollegeBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<CollegeRow | null> => {
    const supabase = publicClient();
    const { data: row, error } = await supabase
      .from("colleges")
      .select(
        "id, slug, name, short_description, streams, categories, popular_courses, established, college_type, academics_rating, campus_life_rating, placements_rating, faculty_rating, hero_image_url",
      )
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) {
      console.error("[getCollegeBySlug]", error);
      return null;
    }
    return (row as CollegeRow) ?? null;
  });

export const listApprovedReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReviewRow[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, college_name, author_name, course, rating, body, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) {
      console.error("[listApprovedReviews]", error);
      return [];
    }
    return (data ?? []) as ReviewRow[];
  },
);

export const listReviewsByCollegeSlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<ReviewRow[]> => {
    const supabase = publicClient();
    const { data: college } = await supabase
      .from("colleges")
      .select("id")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!college) return [];
    const { data: rows, error } = await supabase
      .from("reviews")
      .select("id, college_name, author_name, course, rating, body, created_at")
      .eq("status", "approved")
      .eq("college_id", college.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[listReviewsByCollegeSlug]", error);
      return [];
    }
    return (rows ?? []) as ReviewRow[];
  });

export const listVerifiedMentors = createServerFn({ method: "GET" }).handler(
  async (): Promise<MentorRow[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("mentors")
      .select("id, name, college_slug, college_name, course, year, whatsapp, photo_url, bio")
      .eq("verified", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[listVerifiedMentors]", error);
      return [];
    }
    return (data ?? []) as MentorRow[];
  },
);
