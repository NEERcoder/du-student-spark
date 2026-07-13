import { WHATSAP_LINK } from "./links";

export function waLink(message?: string): string {
  if (!message) return WHATSAPP_LINK;
  const sep = WHATSAPP_LINK.includes("?") ? "&" : "?";
  return `${WHATSAPP_LINK}${sep}text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  guidance: (college: string) => `Hi DU Science Hub, I would like guidance regarding ${college}.`,
  mentor: (college: string) =>
    `Hi DU Science Hub, I would like to connect with a mentor from ${college}.`,
  campusReviewer: () =>
    `Hi DU Science Hub, I'd like to become a campus reviewer and share my college experience.`,
};
