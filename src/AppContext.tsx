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

type StudentAction = StudentAddToRoleAction | StudentRemoveFromRoleAction;

const studentsReducer = (students: Student[], action: StudentAction) => {
  switch (action.type) {
    case "ADD_STUDENT_TO_ROLE":
      return students.map((s) =>
        s.name == action.student.name
          ? { ...s, roles: s.roles.includes(action.role) ? s.roles : s.roles.concat(action.role) }
          : s
      );
    case "REMOVE_STUDENT_FROM_ROLE":
      return students.map((s) =>
        s.name == action.student.name
          ? { ...s, roles: s.roles.filter((r) => r.name != action.role.name) }
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
          ? { ...r, students: r.students.includes(action.student.name) ? r.students : r.students.concat(action.student.name) }
          : r
      );
    case "REMOVE_STUDENT_FROM_ROLE":
      return roles.map((r) =>
        r.name == action.role.name
          ? { ...r, students: r.students.filter((s) => s != action.student.name) }
          : r
      );
    default:
      return roles;
  }
};
