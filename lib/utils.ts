import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "TechAegisAI",
  url: "https://techaegisai.com",
  description:
    "Ship agentic AI that earns its keep. We design, build, and ship AI workflows that cut hours, grow revenue, and turn your ops into a moat.",
  tagline: "Agentic AI consulting for companies that ship.",
  email: "hello@techaegisai.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/techaegisai",
    x: "https://x.com/techaegisai",
  },
};
