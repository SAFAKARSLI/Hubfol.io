import IBrandRepository from "@/repositories/IBrandRepository";
import IEmployeeRepository from "@/repositories/IEmployeeRepository";
import IProjectRepository from "@/repositories/IProjectRepository";
import ISectionRepository from "@/repositories/ISectionRepository";

import Brand from "@/types/brand";
import Employee from "@/types/employee";
import Project from "@/types/project";
import Section from "@/types/section";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables:", {
    url: supabaseUrl ? "set" : "missing",
    key: supabaseKey ? "set" : "missing",
  });
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

// Test the connection
// supabase
//   .from("Employee")
//   .select("count")
//   .then(({ data, error }) => {
//     if (error) {
//       console.error("Supabase connection test failed:", error);
//     } else {
//       console.log("Supabase connection successful");
//     }
//   });

export class EmployeeRepository implements IEmployeeRepository {
  async findEmployeeByUsername(username: string): Promise<Employee> {
    const { data, error } = await supabase
      .from("Employee")
      .select("*")
      .eq("username", username);

    console.log(
      `findEmployeeByUsername(): Found employee with username:${username}:`,
      data
    );

    if (error) {
      throw error;
    }

    return data[0] as Employee;
  }

  async updateEmployee(
    userId: string,
    data: Partial<Employee>
  ): Promise<Employee> {
    const { data: updatedData, error } = await supabase
      .from("Employee")
      .update(data)
      .eq("userId", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return updatedData as Employee;
  }

  async createEmployee(employee: Employee): Promise<Employee> {
    const { data, error } = await supabase
      .from("Employee")
      .insert(employee)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Employee;
  }
}
export class ProjectRepository implements IProjectRepository {
  async findProjectBySlug(slug: string): Promise<Project> {
    const { data, error } = await supabase
      .from("Project")
      .select("*")
      .eq("slug", slug);

    if (error) {
      throw error;
    }

    return data[0] as Project;
  }

  async findProjectByUuid(uuid: string): Promise<Project> {
    const { data, error } = await supabase
      .from("Project")
      .select("*")
      .eq("uuid", uuid);

    if (error) {
      throw error;
    }

    return data[0] as Project;
  }

  async findProjectsByOwnerId(ownerId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from("Project")
      .select("*")
      .order("createdAt", { ascending: true })
      .eq("ownerId", ownerId);

    if (error) {
      throw error;
    }

    return data as Project[];
  }

  async findProjectsByOwnerUsername(
    ownerUsername: string
  ): Promise<Project[] | null> {
    const owner = await new EmployeeRepository().findEmployeeByUsername(
      ownerUsername
    );

    if (!owner) {
      return null;
    }

    const { data, error } = await supabase
      .from("Project")
      .select("*")
      .eq("ownerId", owner.uuid);

    if (error) {
      throw error;
    }

    return data as Project[];
  }

  async createProject(project: Project): Promise<Project> {
    const { data, error } = await supabase
      .from("Project")
      .insert(project)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data as Project;
  }

  async updateProject(project: Project & { id: number }): Promise<Project> {
    const { data, error } = await supabase
      .from("Project")
      .update(project)
      .eq("uuid", project.uuid)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data as Project;
  }

  async deleteProject(project: Project): Promise<void> {
    const { error } = await supabase
      .from("Project")
      .delete()
      .eq("uuid", project.uuid);

    if (error) {
      throw error;
    }
  }
}
export class SectionRepository implements ISectionRepository {
  async findSectionByUuid(uuid: string): Promise<Section> {
    const { data, error } = await supabase
      .from("Section")
      .select("*")
      .eq("uuid", uuid);

    if (error) {
      throw error;
    }

    return data[0] as Section;
  }

  async findSectionsByProjectUuid(projectUuid: string): Promise<Section[]> {
    const { data, error } = await supabase
      .from("Section")
      .select("*")
      .eq("projectId", projectUuid);

    if (error) {
      throw error;
    }

    return data as Section[];
  }

  async findSectionsByProjectSlug(projectSlug: string): Promise<Section[]> {
    const { data, error } = await supabase
      .from("Section")
      .select("*")
      .eq("projectSlug", projectSlug);

    if (error) {
      throw error;
    }

    return data as Section[];
  }

  async createSection(section: Section): Promise<Section> {
    const { data, error } = await supabase
      .from("Section")
      .insert(section)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Section;
  }

  async updateSection(section: Section): Promise<Section> {
    const { data, error } = await supabase
      .from("Section")
      .update(section)
      .eq("uuid", section.uuid)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Section;
  }

  async deleteSection(section: Section): Promise<void> {
    const { error } = await supabase
      .from("Section")
      .delete()
      .eq("uuid", section.uuid);

    if (error) {
      throw error;
    }
  }
}
export class BrandRepository implements IBrandRepository {
  async findBrandsByQuery(query: string): Promise<Brand[]> {
    const { data, error } = await supabase
      .from("BrandIcons")
      .select("*")
      .ilike("brand_name", `${query}%`)
      .limit(30);

    if (error) {
      throw error;
    }

    return data as Brand[];
  }
}
