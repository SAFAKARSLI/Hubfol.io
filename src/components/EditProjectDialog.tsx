import React from 'react';
import ProjectDialog from './ProjectDialog';
import Project from '@/types/project';

type Props = {
  project: Project;
  setProject: (project: Project) => void;
  setEditDialogeOpen: (open: boolean) => void;
};

function EditProjectDialog({ project, setProject, setEditDialogeOpen }: Props) {
  const handleEditProject = async () => {
    console.log('Edit project', project);
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
