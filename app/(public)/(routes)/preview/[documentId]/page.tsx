"use client";

import { Cover } from "@/components/cover";
import Editor from "@/components/editor";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

interface IDocument {
 params: {
  documentId: Id<"documents">;
 };
}

const DocumentPage = ({ params }: IDocument) => {
 const document = useQuery(api.documents.getById, {
  documentId: params.documentId,
 });

 const update = useMutation(api.documents.update);
 console.log(params.documentId);
 const onChange = (content: string) => {
  update({
   id: params.documentId,
   content,
  });
 };

 if (document === undefined) {
  return <div>Loading...</div>;
 }

 if (document === null) {
  return <div>Document not found</div>;
 }

 return (
  <div className="pb-40">
   <Cover preview url={document.coverImage} />
   <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
    <Toolbar preview initialData={document} />
    <Editor
     editable={false}
     initialContent={document.content}
     onChange={onChange}
    />
   </div>
  </div>
 );
};

export default DocumentPage;
