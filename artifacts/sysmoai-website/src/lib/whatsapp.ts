export const WA_NUMBER = "8801711638693";

export const WA_MESSAGE = "Hi SYSmoAI, I need help";

export function getWhatsAppUrl(message?: string): string {
  const msg = encodeURIComponent(message || WA_MESSAGE);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export const WA_URLS = {
  general:     getWhatsAppUrl("Hi SYSmoAI, I need help"),
  fitcheck:    getWhatsAppUrl("Hi SYSmoAI, I'd like to apply for the Lead Rescue Fit Check. Here's about my agency: "),
  leadrescue:  getWhatsAppUrl("Hi SYSmoAI, I'd like to know more about the Lead Rescue System - Agency Edition"),
  audit:       getWhatsAppUrl("Hi SYSmoAI, I want to book a Fit Check call"),
  consultation: getWhatsAppUrl("Hi SYSmoAI, I want to have a conversation about Lead Rescue"),
};
