export const WA_NUMBER = "8801711638693";

export const WA_MESSAGE = "Hi SYSmoAI, I need help";

export function getWhatsAppUrl(message?: string): string {
  const msg = encodeURIComponent(message || WA_MESSAGE);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export const WA_URLS = {
  general:      getWhatsAppUrl("Hi SYSmoAI, I need help"),
  audit:        getWhatsAppUrl("Hi SYSmoAI, I want to book a Free AI Audit"),
  quickwin:     getWhatsAppUrl("Hi SYSmoAI, I'm interested in the AI Quick Win"),
  sprint:       getWhatsAppUrl("Hi SYSmoAI, I'm interested in the AI Sprint"),
  retainer:     getWhatsAppUrl("Hi SYSmoAI, I'm interested in the AI Retainer"),
  consultation: getWhatsAppUrl("Hi SYSmoAI, I want to book a free 30-minute consultation"),
};
