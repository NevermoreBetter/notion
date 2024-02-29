"use client";

import { useEffect, useState } from "react";
import { Settings } from "./modals/settings-modal";
import CoverImage from "./modals/cover-image-model";

export const ModalProvider = () => {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) return null;

 return (
  <>
   <Settings />
   <CoverImage />
  </>
 );
};
