export const PHONE_DISPLAY = "+91 77025 74861";
export const PHONE_SHORT = "77025 74861";
export const PHONE_TEL = "tel:+917702574861";
export const WA_NUMBER = "917702574861";
export const WA_DEFAULT_MSG =
  "Hello Smart Carz Guntur, I want to sell my car. Please contact me with more details.";

export function waLink(message: string = WA_DEFAULT_MSG) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
