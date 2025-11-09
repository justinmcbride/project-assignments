"use client";

import { useState } from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Divider,
} from "@mui/joy";
import { useAppState } from "@/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RestoreIcon from "@mui/icons-material/Restore";

interface EditConfigModalProps {
  open: boolean;
  onClose: () => void;
}

export const EditConfigModal = ({ open, onClose }: EditConfigModalProps) => {
  const { state, dispatch } = useAppState();
  const [activeTab, setActiveTab] = useState(0);

  // Student editing state
  const [newStudentName, setNewStudentName] = useState("");
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editStudentName, setEditStudentName] = useState("");

  // Role editing state
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    desiredStudents: 1,
  });
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editRoleData, setEditRoleData] = useState({
    name: "",
    description: "",
    desiredStudents: 1,
  });

  // Student handlers
  const handleAddStudent = () => {
    if (newStudentName.trim()) {
      dispatch({ type: "ADD_STUDENT", name: newStudentName.trim() });
      setNewStudentName("");
    }
  };

  const handleRemoveStudent = (name: string) => {
    dispatch({ type: "REMOVE_STUDENT", name });
  };

  const handleStartEditStudent = (name: string) => {
    setEditingStudent(name);
    setEditStudentName(name);
  };

  const handleSaveStudent = () => {
    if (editingStudent && editStudentName.trim()) {
      dispatch({
        type: "UPDATE_STUDENT",
        oldName: editingStudent,
        newName: editStudentName.trim(),
      });
      setEditingStudent(null);
      setEditStudentName("");
    }
  };

  const handleCancelEditStudent = () => {
    setEditingStudent(null);
    setEditStudentName("");
  };

  // Role handlers
  const handleAddRole = () => {
    if (newRole.name.trim() && newRole.description.trim()) {
      dispatch({
        type: "ADD_ROLE",
        role: {
          name: newRole.name.trim(),
          description: newRole.description.trim(),
          desiredStudents: newRole.desiredStudents,
        },
      });
      setNewRole({ name: "", description: "", desiredStudents: 1 });
    }
  };

  const handleRemoveRole = (name: string) => {
    dispatch({ type: "REMOVE_ROLE", name });
  };

  const handleStartEditRole = (name: string) => {
    const role = state.roles.find((r) => r.name === name);
    if (role) {
      setEditingRole(name);
      setEditRoleData({
        name: role.name,
        description: role.description,
        desiredStudents: role.desiredStudents,
      });
    }
  };

  const handleSaveRole = () => {
    if (editingRole && editRoleData.name.trim() && editRoleData.description.trim()) {
      dispatch({
        type: "UPDATE_ROLE",
        oldName: editingRole,
        role: {
          name: editRoleData.name.trim(),
          description: editRoleData.description.trim(),
          desiredStudents: editRoleData.desiredStudents,
        },
      });
      setEditingRole(null);
      setEditRoleData({ name: "", description: "", desiredStudents: 1 });
    }
  };

  const handleCancelEditRole = () => {
    setEditingRole(null);
    setEditRoleData({ name: "", description: "", desiredStudents: 1 });
  };

  const handleResetToDefaults = () => {
    if (confirm("Are you sure you want to reset to default students and roles? This will clear all assignments and custom data.")) {
      dispatch({ type: "RESET_STATE" });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: "90vw", maxWidth: 800, maxHeight: "90vh", overflow: "auto" }}>
        <ModalClose />
        <Typography level="h4" sx={{ mb: 1 }}>
          Configure Students and Roles
        </Typography>
        
        <Typography level="body-sm" sx={{ mb: 2, fontStyle: "italic", color: "text.tertiary" }}>
          💾 All changes are automatically saved to your browser
        </Typography>

        <div className="flex justify-center mb-3">
          <Button
            variant="outlined"
            color="warning"
            startDecorator={<RestoreIcon />}
            onClick={handleResetToDefaults}
            size="sm"
          >
            Reset to Defaults
          </Button>
        </div>

        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value as number)}>
          <TabList>
            <Tab>
              <PersonIcon sx={{ mr: 1 }} />
              Students ({state.students.length})
            </Tab>
            <Tab>
              <WorkIcon sx={{ mr: 1 }} />
              Roles ({state.roles.length})
            </Tab>
          </TabList>

          {/* Students Tab */}
          <TabPanel value={0} sx={{ p: 2 }}>
            <Typography level="title-md" sx={{ mb: 2 }}>
              Add New Student
            </Typography>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Student name"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddStudent()}
                sx={{ flex: 1 }}
              />
              <Button
                startDecorator={<AddIcon />}
                onClick={handleAddStudent}
                disabled={!newStudentName.trim()}
              >
                Add
              </Button>
            </div>

            <Divider sx={{ my: 2 }} />

            <Typography level="title-md" sx={{ mb: 2 }}>
              All Students
            </Typography>
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {state.students.map((student) => (
                <ListItem key={student.name}>
                  <ListItemDecorator>
                    <PersonIcon />
                  </ListItemDecorator>
                  {editingStudent === student.name ? (
                    <ListItemContent sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Input
                        value={editStudentName}
                        onChange={(e) => setEditStudentName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSaveStudent()}
                        sx={{ flex: 1 }}
                        autoFocus
                      />
                      <IconButton size="sm" color="success" onClick={handleSaveStudent}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton size="sm" color="neutral" onClick={handleCancelEditStudent}>
                        <CancelIcon />
                      </IconButton>
                    </ListItemContent>
                  ) : (
                    <>
                      <ListItemContent>{student.name}</ListItemContent>
                      <IconButton
                        size="sm"
                        color="neutral"
                        onClick={() => handleStartEditStudent(student.name)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="danger"
                        onClick={() => handleRemoveStudent(student.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </TabPanel>

          {/* Roles Tab */}
          <TabPanel value={1} sx={{ p: 2 }}>
            <Typography level="title-md" sx={{ mb: 2 }}>
              Add New Role
            </Typography>
            <div className="flex flex-col gap-2 mb-4">
              <Input
                placeholder="Role name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              />
              <Textarea
                placeholder="Role description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                minRows={2}
              />
              <FormControl>
                <FormLabel>Desired Students</FormLabel>
                <Input
                  type="number"
                  value={newRole.desiredStudents}
                  onChange={(e) =>
                    setNewRole({ ...newRole, desiredStudents: parseInt(e.target.value) || 1 })
                  }
                  slotProps={{ input: { min: 1 } }}
                />
              </FormControl>
              <Button
                startDecorator={<AddIcon />}
                onClick={handleAddRole}
                disabled={!newRole.name.trim() || !newRole.description.trim()}
              >
                Add Role
              </Button>
            </div>

            <Divider sx={{ my: 2 }} />

            <Typography level="title-md" sx={{ mb: 2 }}>
              All Roles
            </Typography>
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {state.roles.map((role) => (
                <ListItem key={role.name} sx={{ alignItems: "flex-start" }}>
                  <ListItemDecorator sx={{ mt: 0.5 }}>
                    <WorkIcon />
                  </ListItemDecorator>
                  {editingRole === role.name ? (
                    <ListItemContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Input
                        value={editRoleData.name}
                        onChange={(e) => setEditRoleData({ ...editRoleData, name: e.target.value })}
                        placeholder="Role name"
                      />
                      <Textarea
                        value={editRoleData.description}
                        onChange={(e) =>
                          setEditRoleData({ ...editRoleData, description: e.target.value })
                        }
                        placeholder="Role description"
                        minRows={2}
                      />
                      <Input
                        type="number"
                        value={editRoleData.desiredStudents}
                        onChange={(e) =>
                          setEditRoleData({
                            ...editRoleData,
                            desiredStudents: parseInt(e.target.value) || 1,
                          })
                        }
                        slotProps={{ input: { min: 1 } }}
                      />
                      <div className="flex gap-1">
                        <Button size="sm" color="success" onClick={handleSaveRole}>
                          <SaveIcon />
                        </Button>
                        <Button size="sm" color="neutral" onClick={handleCancelEditRole}>
                          <CancelIcon />
                        </Button>
                      </div>
                    </ListItemContent>
                  ) : (
                    <>
                      <ListItemContent>
                        <Typography level="title-sm">{role.name}</Typography>
                        <Typography level="body-sm">{role.description}</Typography>
                        <Typography level="body-xs" sx={{ mt: 0.5 }}>
                          Desired: {role.desiredStudents} student{role.desiredStudents !== 1 ? "s" : ""}
                        </Typography>
                      </ListItemContent>
                      <IconButton
                        size="sm"
                        color="neutral"
                        onClick={() => handleStartEditRole(role.name)}
                        sx={{ mt: 0.5 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="danger"
                        onClick={() => handleRemoveRole(role.name)}
                        sx={{ mt: 0.5 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </Tabs>
      </ModalDialog>
    </Modal>
  );
};
