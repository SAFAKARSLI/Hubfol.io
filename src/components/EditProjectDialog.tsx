import React from 'react';
import ProjectDialog from './ProjectDialog';
import Project from '@/types/project';
import { updateProject } from '@/app/actions';

type Props = {
  project: Project;
  setProject: (project: Project) => void;
  setEditDialogeOpen: (open: boolean) => void;
};

function EditProjectDialog({ project, setProject, setEditDialogeOpen }: Props) {
  const handleEditProject = async () => {
    const updatedProject = await updateProject(
      project.projectUUID!,
      project,
      project.ownerId!
    );
  };

  return (
    <ProjectDialog
      title="Edit Project"
      actionButtonLabel="Confirm Edit"
      project={project}
      setProject={setProject}
      onSubmit={handleEditProject}
      setDialog={setEditDialogeOpen}
    />
  );
}

export default EditProjectDialog;
