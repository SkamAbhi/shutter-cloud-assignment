import ProjectForm from '@/app/components/ProjectForm';
import { Suspense } from 'react';

interface ProjectEditPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectEditPage({ params }: ProjectEditPageProps) {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectForm projectId={"123"} />
      </Suspense>
    </div>
  );
}