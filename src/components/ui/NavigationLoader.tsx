"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import PageLoader from "./PageLoader";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setShowLoader(true);
  }, [pathname]);

  return (
    <AnimatePresence>
      {showLoader && (
        <PageLoader onComplete={() => setShowLoader(false)} />
      )}
    </AnimatePresence>
  );
}
