import Project from "@/types/project";

export default interface IProjectRepository {
  findProjectBySlug(slug: string): Promise<Project> | null;
  findProjectByUuid(uuid: string): Promise<Project> | null;
  findProjectsByOwnerId(ownerId: string): Promise<Project[] | null>;
  findProjectsByOwnerUsername(ownerUsername: string): Promise<Project[] | null>;

  createProject(project: Project): Promise<Project>;
  updateProject(project: Project): Promise<Project>;
  deleteProject(project: Project): Promise<void>;
}
