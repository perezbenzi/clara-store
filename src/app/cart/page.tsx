import type { Metadata } from "next";
import CartContent from "./CartContent";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Clara's Bakehouse order before checkout.",
};

export default function CartPage() {
  return (
    <>
      <CartContent />
      <Footer />
    </>
  );
}
