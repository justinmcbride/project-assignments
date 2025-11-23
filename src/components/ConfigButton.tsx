"use client";

import { Button } from "@mui/joy";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { EditConfigModal } from "@/components/EditConfigModal";

export const ConfigButton = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        size="sm"
        color="neutral"
        startDecorator={<SettingsIcon />}
        onClick={() => setEditModalOpen(true)}
      >
        Config
      </Button>
      <EditConfigModal open={editModalOpen} onClose={() => setEditModalOpen(false)} />
    </>
  );
};
