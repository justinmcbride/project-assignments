export default interface Role {
  name: string;
  description: string;
  desiredStudents: number;
  students: string[];
  mentors: string[];
}
