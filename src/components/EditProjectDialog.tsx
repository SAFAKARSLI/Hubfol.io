'use client';
import React from 'react';
import ProjectDialog from './ProjectDialog';
import Project from '@/types/project';
import { deleteIcon, updateProject } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { initial } from 'lodash';

type Props = {
  project: Project;
  setProject: (project: Project) => void;
  setEditDialogeOpen: (open: boolean) => void;
  initialProject: Project;
};

function EditProjectDialog({
  project,
  setProject,
  setEditDialogeOpen,
  initialProject,
}: Props) {
  const router = useRouter();
  const handleEditProject = async () => {
    if (initialProject.iconLink !== project.iconLink) {
      await deleteIcon(initialProject.iconLink as string);
    }
    const updatedProject = await updateProject(project.projectUUID!, project);
    location.reload();
  };

  return (
    <ProjectDialog
      title="Edit Project"
      actionButtonLabel="Confirm Edit"
      project={project}
      setProject={setProject}
      onSubmit={handleEditProject}
      setDialog={setEditDialogeOpen}
      initialProject={initialProject}
    />
  );
}

export default EditProjectDialog;
