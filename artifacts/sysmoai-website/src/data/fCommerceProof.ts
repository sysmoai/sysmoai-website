// Shared F-Commerce seller proof dataset.
// Used by both the homepage F-Commerce proof section and the /proof page so
// the numbers stay consistent. Sellers are referenced by representative
// identifiers ("Seller A · ...") until verified case studies with full
// names are published — matches the disclaimer copy on /proof.

export interface FCommerceProofItem {
  id: string;
  emoji: string;
  /** Short identifier shown as the card label, e.g. "Seller A · Dhaka fashion boutique". */
  seller: string;
  /** One-line headline result. */
  headline: string;
  /** Supporting detail describing what was built. */
  detail: string;
  /** Time-to-result, e.g. "In 14 days". */
  window: string;
}

export const F_COMMERCE_PROOF: readonly FCommerceProofItem[] = [
  {
    id: "seller-a-dhaka-fashion",
    emoji: "👗",
    seller: "Example scope · Fashion page",
    headline: "Bangla DM drafts + order capture",
    detail:
      "Facebook DM reply drafts the owner approves, plus order capture. Example scope, not a client result.",
    window: "Target build: 14 days",
  },
  {
    id: "seller-b-chattogram-food",
    emoji: "🍱",
    seller: "Example scope · Food brand",
    headline: "WhatsApp + Messenger intake",
    detail:
      "WhatsApp + Messenger intake, owner-checked bKash/Nagad confirmations and a delivery dashboard. Example scope, not a client result.",
    window: "Scope agreed in writing",
  },
  {
    id: "seller-c-sylhet-beauty",
    emoji: "💄",
    seller: "Example scope · Beauty seller",
    headline: "Repeat-question reply drafts",
    detail:
      "Draft replies for repeat questions (size, delivery); prices are never invented and come only from the owner. Example scope, not a client result.",
    window: "Scope agreed in writing",
  },
  {
    id: "seller-d-dhaka-home-goods",
    emoji: "🛒",
    seller: "Example scope · Home-goods page",
    headline: "Missed-DM follow-up queue",
    detail:
      "A follow-up queue that reminds the owner about unanswered DMs. Example scope, not a client result.",
    window: "Scope agreed in writing",
  },
  {
    id: "seller-e-sneaker-reseller",
    emoji: "👟",
    seller: "Example scope · Reseller",
    headline: "Order-status replies",
    detail:
      'Buyers text "track <order>" on WhatsApp and receive a status reply. Example scope, not a client result.',
    window: "Scope agreed in writing",
  },
];
