"use client";

import { useEffect, useState } from "react";
import { Settings } from "./modals/settings-modal";

export const ModalProvider = () => {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) return null;

 return (
  <>
   <Settings></Settings>
  </>
 );
};
