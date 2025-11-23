import Role from "@/types/Role";
import Student from "@/types/Student";
import Mentor from "@/types/Mentor";

interface ExportData {
  roles: Role[];
  students: Student[];
  mentors: Mentor[];
}

interface FileSystemWritableFileStream {
  write: (data: BlobPart) => Promise<void>;
  close: () => Promise<void>;
}

interface FileSystemFileHandle {
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

type SaveFilePickerOptions = {
  suggestedName?: string;
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
};

/**
 * Generates formatted text content for role assignments
 */
export function generateAssignmentsText(data: ExportData): string {
  const { roles, students, mentors } = data;
  
  let textContent = "PROJECT ROLE ASSIGNMENTS\n";
  textContent += "=".repeat(50) + "\n\n";
  
  // Add roles and their assigned students
  roles.forEach((role) => {
    const assignedStudents = students.filter((student) =>
      role.students.includes(student.name)
    );
    const assignedMentors = mentors.filter((mentor) =>
      (role.mentors || []).includes(mentor.name)
    );
    
    textContent += `${role.name}\n`;
    textContent += "-".repeat(role.name.length) + "\n";
    textContent += `Description: ${role.description}\n`;
    textContent += `Capacity: ${assignedStudents.length} / ${role.desiredStudents} student${role.desiredStudents !== 1 ? 's' : ''}\n`;
    textContent += `Mentors Present: ${assignedMentors.length}\n`;
    
    if (assignedStudents.length > 0) {
      textContent += "\nAssigned Students:\n";
      assignedStudents.forEach((student, index) => {
        textContent += `  ${index + 1}. ${student.name}\n`;
      });
    } else {
      textContent += "\nNo students assigned yet.\n";
    }

    if (assignedMentors.length > 0) {
      textContent += "\nAssigned Mentors:\n";
      assignedMentors.forEach((mentor, index) => {
        textContent += `  ${index + 1}. ${mentor.name}\n`;
      });
    } else {
      textContent += "\nNo mentors assigned yet.\n";
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

  const unassignedMentors = mentors.filter(
    (mentor) => mentor.roles.length === 0
  );

  if (unassignedMentors.length > 0) {
    textContent += "UNASSIGNED MENTORS\n";
    textContent += "=".repeat(50) + "\n";
    unassignedMentors.forEach((mentor, index) => {
      textContent += `${index + 1}. ${mentor.name}\n`;
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

  const multiRoleMentors = mentors.filter((mentor) => mentor.roles.length > 1);

  if (multiRoleMentors.length > 0) {
    textContent += "MENTORS IN MULTIPLE ROLES\n";
    textContent += "=".repeat(50) + "\n";
    multiRoleMentors.forEach((mentor) => {
      textContent += `${mentor.name} (${mentor.roles.length} roles):\n`;
      mentor.roles.forEach((role) => {
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
  textContent += `Total Mentors: ${mentors.length}\n`;
  textContent += `Assigned Mentors: ${mentors.filter(m => m.roles.length > 0).length}\n`;
  textContent += `Unassigned Mentors: ${unassignedMentors.length}\n`;
  
  return textContent;
}

/**
 * Exports assignments to a text file with a save dialog
 */
export async function exportAssignmentsToFile(data: ExportData): Promise<void> {
  const textContent = generateAssignmentsText(data);
  type ShowSaveFilePicker = (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
  interface WindowWithSaveFilePicker extends Window {
    showSaveFilePicker?: ShowSaveFilePicker;
  }
  const fsWindow = window as WindowWithSaveFilePicker;
  
  // Try to use the File System Access API (shows save dialog)
  try {
    // Check if the API is supported
    if (typeof fsWindow.showSaveFilePicker === "function") {
      const handle = await fsWindow.showSaveFilePicker({
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

/**
 * Exports the entire state configuration as a JSON file
 */
export async function exportConfigToJSON(data: ExportData): Promise<void> {
  const jsonContent = JSON.stringify(data, null, 2);
  type ShowSaveFilePicker = (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
  interface WindowWithSaveFilePicker extends Window {
    showSaveFilePicker?: ShowSaveFilePicker;
  }
  const fsWindow = window as WindowWithSaveFilePicker;
  
  // Try to use the File System Access API (shows save dialog)
  try {
    if (typeof fsWindow.showSaveFilePicker === "function") {
      const handle = await fsWindow.showSaveFilePicker({
        suggestedName: 'project-config.json',
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });
      
      const writable = await handle.createWritable();
      await writable.write(jsonContent);
      await writable.close();
      return;
    }
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      return; // User cancelled
    }
  }
  
  // Fallback for browsers that don't support File System Access API
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "project-config.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Imports configuration from a JSON file
 * Returns the parsed data or null if cancelled/error
 */
export async function importConfigFromJSON(): Promise<ExportData | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      
      try {
        const text = await file.text();
        const data = JSON.parse(text) as ExportData;
        
        // Validate the structure
        if (!data.students || !data.roles || !Array.isArray(data.students) || !Array.isArray(data.roles)) {
          alert("Invalid config file: Missing required fields (students, roles)");
          resolve(null);
          return;
        }
        
        // Ensure mentors exists (backwards compatibility)
        if (!data.mentors || !Array.isArray(data.mentors)) {
          data.mentors = [];
        }
        
        resolve(data);
      } catch (err) {
        alert("Error reading config file: " + (err as Error).message);
        resolve(null);
      }
    };
    
    input.oncancel = () => {
      resolve(null);
    };
    
    input.click();
  });
}

