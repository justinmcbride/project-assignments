"use client";

import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import previewStudents from "./previewData/previewStudents";
import previewRoles from "@/previewData/previewRoles";
import Student from "./types/Student";
import Role from "./types/Role";

type InitialStateType = {
  students: Student[];
  roles: Role[];
};

const initialState: InitialStateType = {
  students: previewStudents,
  roles: previewRoles,
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<StudentAction>;
}>({
  state: { students: previewStudents, roles: previewRoles },
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

type StudentAction = 
  | StudentAddToRoleAction 
  | StudentRemoveFromRoleAction
  | AddStudentAction
  | RemoveStudentAction
  | UpdateStudentAction
  | AddRoleAction
  | RemoveRoleAction
  | UpdateRoleAction;

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
    default:
      return roles;
  }
};
