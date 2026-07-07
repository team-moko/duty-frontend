"use server";

import type { RecommendCombosRequest } from "@/api/recommend";
import {
  encodeRecommendForm,
  RECOMMEND_FORM_COOKIE,
} from "@/lib/recommend-form";
import { cookies } from "next/headers";

export async function saveRecommendFormAction(body: RecommendCombosRequest) {
  const cookieStore = await cookies();
  cookieStore.set(RECOMMEND_FORM_COOKIE, encodeRecommendForm(body), {
    httpOnly: true,
    maxAge: 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
