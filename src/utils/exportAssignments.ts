import Role from "@/types/Role";
import Student from "@/types/Student";

interface ExportData {
  roles: Role[];
  students: Student[];
}

/**
 * Generates formatted text content for role assignments
 */
export function generateAssignmentsText(data: ExportData): string {
  const { roles, students } = data;
  
  let textContent = "PROJECT ROLE ASSIGNMENTS\n";
  textContent += "=".repeat(50) + "\n\n";
  
  // Add roles and their assigned students
  roles.forEach((role) => {
    const assignedStudents = students.filter((student) =>
      role.students.includes(student.name)
    );
    
    textContent += `${role.name}\n`;
    textContent += "-".repeat(role.name.length) + "\n";
    textContent += `Description: ${role.description}\n`;
    textContent += `Capacity: ${assignedStudents.length} / ${role.desiredStudents} student${role.desiredStudents !== 1 ? 's' : ''}\n`;
    
    if (assignedStudents.length > 0) {
      textContent += "\nAssigned Students:\n";
      assignedStudents.forEach((student, index) => {
        textContent += `  ${index + 1}. ${student.name}\n`;
      });
    } else {
      textContent += "\nNo students assigned yet.\n";
    }
    
    textContent += "\n";
  });
  
  // Add unassigned students section
  const unassignedStudents = students.filter(
    (student) => student.roles.length === 0
  );
  
  if (unassignedStudents.length > 0) {
    textContent += "UNASSIGNED STUDENTS\n";
    textContent += "=".repeat(50) + "\n";
    unassignedStudents.forEach((student, index) => {
      textContent += `${index + 1}. ${student.name}\n`;
    });
    textContent += "\n";
  }
  
  // Add students in multiple roles section
  const multiRoleStudents = students.filter(
    (student) => student.roles.length > 1
  );
  
  if (multiRoleStudents.length > 0) {
    textContent += "STUDENTS IN MULTIPLE ROLES\n";
    textContent += "=".repeat(50) + "\n";
    multiRoleStudents.forEach((student) => {
      textContent += `${student.name} (${student.roles.length} roles):\n`;
      student.roles.forEach((role) => {
        textContent += `  • ${role.name}\n`;
      });
      textContent += "\n";
    });
  }
  
  // Add summary
  textContent += "SUMMARY\n";
  textContent += "=".repeat(50) + "\n";
  textContent += `Total Roles: ${roles.length}\n`;
  textContent += `Total Students: ${students.length}\n`;
  textContent += `Assigned Students: ${students.filter(s => s.roles.length > 0).length}\n`;
  textContent += `Unassigned Students: ${unassignedStudents.length}\n`;
  
  return textContent;
}

/**
 * Exports assignments to a text file with a save dialog
 */
export async function exportAssignmentsToFile(data: ExportData): Promise<void> {
  const textContent = generateAssignmentsText(data);
  
  // Try to use the File System Access API (shows save dialog)
  try {
    // Check if the API is supported
    if ('showSaveFilePicker' in window) {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: 'roles.txt',
        types: [
          {
            description: 'Text Files',
            accept: { 'text/plain': ['.txt'] },
          },
        ],
      });
      
      const writable = await handle.createWritable();
      await writable.write(textContent);
      await writable.close();
      return;
    }
  } catch (err) {
    // User cancelled or error occurred, fall through to fallback
    if ((err as Error).name === 'AbortError') {
      return; // User cancelled
    }
  }
  
  // Fallback for browsers that don't support File System Access API
  const blob = new Blob([textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "roles.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
