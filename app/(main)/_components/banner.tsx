"use client ";

import { Alert } from "@/components/modals/confirm";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IBanner {
 documentId: Id<"documents">;
}

const Banner = ({ documentId }: IBanner) => {
 const router = useRouter();
 const remove = useMutation(api.documents.remove);
 const restore = useMutation(api.documents.restore);

 const onRemove = () => {
  const promise = remove({ id: documentId });
  toast.promise(promise, {
   loading: "Deleting note...",
   success: "Note deleted successfully",
   error: "Error deleting note",
  });

  router.push("/documents");
 };

 const onRestore = () => {
  const promise = restore({ id: documentId });
  toast.promise(promise, {
   loading: "Restoring note...",
   success: "Note restored successfully",
   error: "Error restoring note",
  });
 };
 return (
  <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
   <p>This note has been deleted.</p>
   <Button
    onClick={onRestore}
    size="sm"
    variant="outline"
    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
   >
    Restore page
   </Button>
   <Alert onConfirm={onRemove}>
    <Button
     size="sm"
     variant="outline"
     className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
    >
     Delete forever
    </Button>
   </Alert>
  </div>
 );
};

export default Banner;
