"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const password = formData.get("password") as string;

  if (password !== process.env.ADMIN_PASSWORD) {
    return "Invalid password";
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  redirect("/admin");
}
