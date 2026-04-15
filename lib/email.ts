import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
export const resend = key ? new Resend(key) : null;

export const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "hello@techaegisai.com";
export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "TechAegisAI <hello@techaegisai.com>";
