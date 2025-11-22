"use client";

import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import previewStudents from "./previewData/previewStudents";
import previewMentors from "./previewData/previewMentors";
import previewRoles from "@/previewData/previewRoles";
import Student from "./types/Student";
import Mentor from "./types/Mentor";
import Role from "./types/Role";

type InitialStateType = {
  students: Student[];
  mentors: Mentor[];
  roles: Role[];
};

const STORAGE_KEY = "project-assignments-state";

// Load state from localStorage
const loadStateFromLocalStorage = (): InitialStateType | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Validate that the parsed state has the expected structure
      if (parsed.students && parsed.roles && Array.isArray(parsed.students) && Array.isArray(parsed.roles)) {
        const normalizedRoles = parsed.roles.map((role: Role) => ({
          ...role,
          students: Array.isArray(role.students) ? role.students : [],
          mentors: Array.isArray(role.mentors) ? role.mentors : [],
        }));

        return {
          students: parsed.students,
          mentors: Array.isArray(parsed.mentors) ? parsed.mentors : previewMentors,
          roles: normalizedRoles,
        };
      }
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }

  return null;
};

// Save state to localStorage
const saveStateToLocalStorage = (state: InitialStateType) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

const initialState: InitialStateType = {
  students: previewStudents,
  mentors: previewMentors,
  roles: previewRoles,
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  state: InitialStateType,
  action: AppAction
): InitialStateType => ({
  students: studentsReducer(state.students, action),
  mentors: mentorsReducer(state.mentors, action),
  roles: rolesReducer(state.roles, action),
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const hasHydratedRef = useRef(false);

  // Load from localStorage after hydration
  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    if (savedState) {
      // Dispatch actions to update state with saved data
      dispatch({ type: "HYDRATE_STATE", payload: savedState });
    }
    hasHydratedRef.current = true;
  }, []);

  // Save to localStorage whenever state changes (but only after hydration)
  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }
    saveStateToLocalStorage(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

interface StudentAddToRoleAction {
  type: "ADD_STUDENT_TO_ROLE";
  student: Student;
  role: Role;
}

interface StudentRemoveFromRoleAction {
  type: "REMOVE_STUDENT_FROM_ROLE";
  student: Student;
  role: Role;
}

interface AddStudentAction {
  type: "ADD_STUDENT";
  name: string;
}

interface RemoveStudentAction {
  type: "REMOVE_STUDENT";
  name: string;
}

interface UpdateStudentAction {
  type: "UPDATE_STUDENT";
  oldName: string;
  newName: string;
}

interface AddRoleAction {
  type: "ADD_ROLE";
  role: Omit<Role, "students" | "mentors">;
}

interface RemoveRoleAction {
  type: "REMOVE_ROLE";
  name: string;
}

interface UpdateRoleAction {
  type: "UPDATE_ROLE";
  oldName: string;
  role: Omit<Role, "students" | "mentors">;
}

interface ResetStateAction {
  type: "RESET_STATE";
}

interface HydrateStateAction {
  type: "HYDRATE_STATE";
  payload: InitialStateType;
}

interface ImportStudentsAction {
  type: "IMPORT_STUDENTS";
  students: string[];
}

interface MentorAddToRoleAction {
  type: "ADD_MENTOR_TO_ROLE";
  mentor: Mentor;
  role: Role;
}

interface MentorRemoveFromRoleAction {
  type: "REMOVE_MENTOR_FROM_ROLE";
  mentor: Mentor;
  role: Role;
}

interface AddMentorAction {
  type: "ADD_MENTOR";
  name: string;
}

interface RemoveMentorAction {
  type: "REMOVE_MENTOR";
  name: string;
}

interface UpdateMentorAction {
  type: "UPDATE_MENTOR";
  oldName: string;
  newName: string;
}

interface ImportMentorsAction {
  type: "IMPORT_MENTORS";
  mentors: string[];
}

type AppAction =
  | StudentAddToRoleAction
  | StudentRemoveFromRoleAction
  | AddStudentAction
  | RemoveStudentAction
  | UpdateStudentAction
  | AddRoleAction
  | RemoveRoleAction
  | UpdateRoleAction
  | ResetStateAction
  | HydrateStateAction
  | ImportStudentsAction
  | MentorAddToRoleAction
  | MentorRemoveFromRoleAction
  | AddMentorAction
  | RemoveMentorAction
  | UpdateMentorAction
  | ImportMentorsAction;

const studentsReducer = (students: Student[], action: AppAction) => {
  switch (action.type) {
    case "ADD_STUDENT_TO_ROLE":
      return students.map((s) =>
        s.name == action.student.name
          ? {
              ...s,
              roles: s.roles.includes(action.role)
                ? s.roles
                : s.roles.concat(action.role),
            }
          : s
      );
    case "REMOVE_STUDENT_FROM_ROLE":
      return students.map((s) =>
        s.name == action.student.name
          ? { ...s, roles: s.roles.filter((r) => r.name != action.role.name) }
          : s
      );
    case "ADD_STUDENT":
      return [...students, { name: action.name, roles: [] }];
    case "REMOVE_STUDENT":
      return students.filter((s) => s.name !== action.name);
    case "UPDATE_STUDENT":
      return students.map((s) =>
        s.name === action.oldName
          ? { ...s, name: action.newName }
          : s
      );
    case "RESET_STATE":
      return previewStudents;
    case "HYDRATE_STATE":
      return action.payload.students;
    case "IMPORT_STUDENTS":
      return action.students.map((name) => ({ name, roles: [] }));
    default:
      return students;
  }
};

const mentorsReducer = (mentors: Mentor[], action: AppAction) => {
  switch (action.type) {
    case "ADD_MENTOR_TO_ROLE":
      return mentors.map((m) =>
        m.name === action.mentor.name
          ? {
              ...m,
              roles: m.roles.includes(action.role)
                ? m.roles
                : m.roles.concat(action.role),
            }
          : m
      );
    case "REMOVE_MENTOR_FROM_ROLE":
      return mentors.map((m) =>
        m.name === action.mentor.name
          ? {
              ...m,
              roles: m.roles.filter((r) => r.name !== action.role.name),
            }
          : m
      );
    case "ADD_MENTOR":
      return [...mentors, { name: action.name, roles: [] }];
    case "REMOVE_MENTOR":
      return mentors.filter((m) => m.name !== action.name);
    case "UPDATE_MENTOR":
      return mentors.map((m) =>
        m.name === action.oldName ? { ...m, name: action.newName } : m
      );
    case "RESET_STATE":
      return previewMentors;
    case "HYDRATE_STATE":
      return action.payload.mentors;
    case "IMPORT_MENTORS":
      return action.mentors.map((name) => ({ name, roles: [] }));
    default:
      return mentors;
  }
};

const rolesReducer = (roles: Role[], action: AppAction) => {
  switch (action.type) {
    case "ADD_STUDENT_TO_ROLE":
      return roles.map((r) =>
        r.name == action.role.name
          ? {
              ...r,
              students: r.students.includes(action.student.name)
                ? r.students
                : r.students.concat(action.student.name),
            }
          : r
      );
    case "REMOVE_STUDENT_FROM_ROLE":
      return roles.map((r) =>
        r.name == action.role.name
          ? {
              ...r,
              students: r.students.filter((s) => s != action.student.name),
            }
          : r
      );
    case "REMOVE_STUDENT":
      return roles.map((r) => ({
        ...r,
        students: r.students.filter((s) => s !== action.name),
      }));
    case "UPDATE_STUDENT":
      return roles.map((r) => ({
        ...r,
        students: r.students.map((s) => 
          s === action.oldName ? action.newName : s
        ),
      }));
    case "ADD_ROLE":
      return [...roles, { ...action.role, students: [], mentors: [] }];
    case "REMOVE_ROLE":
      return roles.filter((r) => r.name !== action.name);
    case "UPDATE_ROLE":
      return roles.map((r) =>
        r.name === action.oldName
          ? { ...action.role, students: r.students, mentors: r.mentors }
          : r
      );
    case "RESET_STATE":
      return previewRoles;
    case "HYDRATE_STATE":
      return action.payload.roles.map((role) => ({
        ...role,
        students: Array.isArray(role.students) ? role.students : [],
        mentors: Array.isArray(role.mentors) ? role.mentors : [],
      }));
    case "IMPORT_STUDENTS":
      // Clear all student assignments from roles when importing new students
      return roles.map((r) => ({ ...r, students: [] }));
    case "ADD_MENTOR_TO_ROLE":
      return roles.map((r) =>
        r.name === action.role.name
          ? {
              ...r,
              mentors: r.mentors.includes(action.mentor.name)
                ? r.mentors
                : r.mentors.concat(action.mentor.name),
            }
          : r
      );
    case "REMOVE_MENTOR_FROM_ROLE":
      return roles.map((r) =>
        r.name === action.role.name
          ? {
              ...r,
              mentors: r.mentors.filter((m) => m !== action.mentor.name),
            }
          : r
      );
    case "REMOVE_MENTOR":
      return roles.map((r) => ({
        ...r,
        mentors: r.mentors.filter((m) => m !== action.name),
      }));
    case "IMPORT_MENTORS":
      return roles.map((r) => ({ ...r, mentors: [] }));
    default:
      return roles;
  }
};
