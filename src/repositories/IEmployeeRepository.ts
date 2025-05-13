import Employee from "@/types/employee";

export default interface IEmployeeRepository {
  findEmployeeByUsername(username: string): Promise<Employee> | null;
  updateEmployee(userId: string, data: Partial<Employee>): Promise<Employee>;
  createEmployee(employee: Employee): Promise<Employee>;
}
