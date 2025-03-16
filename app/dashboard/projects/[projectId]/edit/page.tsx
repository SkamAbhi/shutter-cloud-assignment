import ProjectForm from "@/app/components/ProjectForm";
import { Suspense } from "react";

export default function ProjectEditPage() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectForm projectId={"123"} />
      </Suspense>
    </div>
  );
}
