import Brand from "@/types/brand";

export default interface IBrandRepository {
  findBrandsByQuery(query: string): Promise<Brand[]>;
}
