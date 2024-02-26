"use client";

import {
 AlertDialogTitle,
 AlertDialogContent,
 AlertDialog,
 AlertDialogTrigger,
 AlertDialogHeader,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogCancel,
 AlertDialogAction,
} from "../ui/alert-dialog";

interface IAlert {
 children: React.ReactNode;
 onConfirm: () => void;
}

export const Alert = ({ children, onConfirm }: IAlert) => {
 const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.stopPropagation();
  onConfirm();
 };

 return (
  <AlertDialog>
   <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
    {children}
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>
      Are you sure you want to delete this item?
     </AlertDialogTitle>
     <AlertDialogDescription>
      This action cannot be undone.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
      Cancel
     </AlertDialogCancel>
     <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
};
