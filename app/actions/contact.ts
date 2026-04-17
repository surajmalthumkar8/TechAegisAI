"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { resend, CONTACT_TO, CONTACT_FROM } from "@/lib/email";
import { ratelimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  email: z.email("That doesn't look like an email"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A little more context helps").max(4000),
});

export type ContactState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; message?: string }
  | { status: "success" };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join(".")] = issue.message;
    }
    return { status: "error", errors };
  }

  if (ratelimit) {
    const h = await headers();
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      "anon";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return {
        status: "error",
        errors: {},
        message: "Too many submissions. Try again in an hour.",
      };
    }
  }

  const { name, email, company, message } = parsed.data;

  if (resend) {
    try {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      console.error("resend send failed", err);
      return {
        status: "error",
        errors: {},
        message: "Couldn't send right now. Email surajm@techaegisai.com directly.",
      };
    }
  } else {
    console.warn("RESEND_API_KEY not set — contact submission dropped:", {
      name,
      email,
      company,
    });
  }

  return { status: "success" };
}
