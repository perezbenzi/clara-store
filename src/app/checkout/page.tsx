import type { Metadata } from "next";
import CheckoutContent from "./CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Clara's Bakehouse click & collect order.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
