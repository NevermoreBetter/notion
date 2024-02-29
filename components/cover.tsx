"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface ICover {
 url?: string;
 preview?: boolean;
}

export const Cover = ({ url, preview }: ICover) => {
 const { edgestore } = useEdgeStore();
 const params = useParams();
 const coverImage = useCoverImage();
 const remove = useMutation(api.documents.removeCoverImage);

 const onRemove = async () => {
  if (url) {
   edgestore.publicFiles.delete({
    url: url,
   });
  }
  remove({
   id: params.documentid as Id<"documents">,
  });
 };

 return (
  <div
   className={cn(
    "relative w-full h-[35vh] group",
    !url && "h-[12vh]",
    url && "bg-muted"
   )}
  >
   {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
   {url && !preview && (
    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
     <Button
      className="text-muted-foreground text-sm"
      variant={"outline"}
      size={"sm"}
      onClick={() => coverImage.onReplace(url)}
     >
      <ImageIcon className="size-4 mr-2" />
      Change cover
     </Button>
     <Button
      className="text-muted-foreground text-sm"
      variant={"outline"}
      size={"sm"}
      onClick={onRemove}
     >
      <X className="size-4 mr-2" />
      Remove cover
     </Button>
    </div>
   )}
  </div>
 );
};
