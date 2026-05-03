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
    seller: "Seller A · Dhaka fashion boutique",
    headline: "400+ DMs/day automated, 0 missed orders",
    detail:
      "Facebook DM auto-reply + order capture flow. Recovered ~32 orders/day that were previously lost in the inbox.",
    window: "In 14 days",
  },
  {
    id: "seller-b-chattogram-food",
    emoji: "🍱",
    seller: "Seller B · Chattogram food brand",
    headline: "50 → 200 orders/day",
    detail:
      "WhatsApp + Messenger automation, bKash/Nagad confirmations, and a delivery dashboard the founder actually checks.",
    window: "In 6 weeks",
  },
  {
    id: "seller-c-sylhet-beauty",
    emoji: "💄",
    seller: "Seller C · Sylhet beauty seller",
    headline: "12 hrs/day on DMs → 90 minutes",
    detail:
      "AI auto-reply handles ~80% of repeat questions (price, size, delivery). Owner only steps in for real buyers.",
    window: "In 21 days",
  },
  {
    id: "seller-d-dhaka-home-goods",
    emoji: "🛒",
    seller: "Seller D · Dhaka home-goods page",
    headline: "~32 lost orders/day recovered",
    detail:
      "Auto-reply + missed-DM follow-up sequence. Same followers, same ad spend — just nothing slipping through.",
    window: "Within month 1",
  },
  {
    id: "seller-e-sneaker-reseller",
    emoji: "👟",
    seller: "Seller E · Sneaker reseller",
    headline: "Order tracking in 1 message",
    detail:
      'Buyers text "track <order>" on WhatsApp and get a live status. Repeat support DMs dropped sharply.',
    window: "Live since week 2",
  },
];
