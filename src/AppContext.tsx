"use client";

import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import previewStudents from "./previewData/previewStudents";
import previewRoles from "@/previewData/previewRoles";
import Student from "./types/Student";
import Role from "./types/Role";

type InitialStateType = {
  students: Student[];
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
        return parsed;
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
  roles: previewRoles,
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<StudentAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { students, roles }: InitialStateType,
  action: StudentAction
) => ({
  students: studentsReducer(students, action),
  roles: rolesReducer(roles, action),
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after hydration
  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    if (savedState) {
      // Dispatch actions to update state with saved data
      dispatch({ type: "HYDRATE_STATE", payload: savedState });
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveStateToLocalStorage(state);
    }
  }, [state, isHydrated]);

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
  role: Omit<Role, "students">;
}

interface RemoveRoleAction {
  type: "REMOVE_ROLE";
  name: string;
}

interface UpdateRoleAction {
  type: "UPDATE_ROLE";
  oldName: string;
  role: Omit<Role, "students">;
}

interface ResetStateAction {
  type: "RESET_STATE";
}

interface HydrateStateAction {
  type: "HYDRATE_STATE";
  payload: InitialStateType;
}

type StudentAction = 
  | StudentAddToRoleAction 
  | StudentRemoveFromRoleAction
  | AddStudentAction
  | RemoveStudentAction
  | UpdateStudentAction
  | AddRoleAction
  | RemoveRoleAction
  | UpdateRoleAction
  | ResetStateAction
  | HydrateStateAction;

const studentsReducer = (students: Student[], action: StudentAction) => {
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
    default:
      return students;
  }
};

const rolesReducer = (roles: Role[], action: StudentAction) => {
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
      return [...roles, { ...action.role, students: [] }];
    case "REMOVE_ROLE":
      return roles.filter((r) => r.name !== action.name);
    case "UPDATE_ROLE":
      return roles.map((r) =>
        r.name === action.oldName
          ? { ...action.role, students: r.students }
          : r
      );
    case "RESET_STATE":
      return previewRoles;
    case "HYDRATE_STATE":
      return action.payload.roles;
    default:
      return roles;
  }
};
