import Section from "@/types/section";

export default interface ISectionRepository {
  findSectionByUuid(uuid: string): Promise<Section> | null;
  findSectionsByProjectUuid(projectUuid: string): Promise<Section[]>;
  findSectionsByProjectSlug(projectSlug: string): Promise<Section[]>;

  createSection(section: Section): Promise<Section>;
  updateSection(section: Section): Promise<Section>;
  deleteSection(section: Section): Promise<void>;
}
