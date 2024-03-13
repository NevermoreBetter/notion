"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "../image-drozone";

interface ICover {}

const CoverImage = () => {
 const params = useParams();
 const update = useMutation(api.documents.update);
 const [file, setFile] = useState<File>();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { edgestore } = useEdgeStore();
 const coverImage = useCoverImage();

 const onChange = async (file?: File) => {
  let res;
  if (file) {
   setIsSubmitting(true);
   setFile(file);

   res = await edgestore.publicFiles.upload({
    file,
    options: {
     replaceTargetUrl: coverImage.url,
    },
   });

   await update({
    id: params.documentid as Id<"documents">,
    coverImage: res.url,
   });

   onClose();
  }
 };

 const onClose = () => {
  setFile(undefined);
  setIsSubmitting(false);
  coverImage.onClose();
 };

 return (
  <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
   <DialogContent>
    <DialogHeader>
     <h2 className="text-center text-lg font-semibold"></h2>
    </DialogHeader>
    <SingleImageDropzone
     className="w-full outline-none"
     disabled={isSubmitting}
     onChange={onChange}
     value={file}
    />
   </DialogContent>
  </Dialog>
 );
};

export default CoverImage;
