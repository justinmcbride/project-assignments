# Cairn Project Assignments

A web application for managing student role assignments in the [Volunteers for Outdoor Colorado (VOC)](https://www.voc.org/) Cairn youth program. This tool helps educators easily assign students to various project leadership roles and responsibilities.

## About

The Cairn program is VOC's youth leadership initiative that teaches students environmental stewardship and project management skills through hands-on conservation projects. Students take on different leadership roles during project days, from safety coordination to crew leadership.

This application streamlines the process of assigning students to these roles, making it easy to visualize assignments, ensure balanced team sizes, and manage role responsibilities.

## Key Features

### 🎯 Drag & Drop Assignment
- Assign students to roles with simple drag-and-drop interactions
- Instantly see which students are assigned to which roles
- Easily reassign students by dragging them between roles or back to the available pool

### 📋 Role Management
- Create and customize project roles with descriptions and target student counts
- Default roles include:
  - Communication Team
  - Safety Lead
  - Technical Advisory Team
  - Tool Manager Team
  - Crew Chef Team
  - Crew Leader Team
  - Community Lead
  - Photography Lead

### 👥 Student Management
- Add individual students one at a time
- Bulk import student lists via comma-separated format
- Edit and remove students as needed
- See each student's assigned roles at a glance

### 📊 Visual Status Indicators
- Color-coded role cards show assignment status at a glance:
  - Green: Role has the target number of students assigned
  - Red: Role is over-assigned (too many students)
  - Gray: Role needs more students
- Each role displays current vs. target student count

### 💾 Automatic Saving
- All changes automatically save to your browser's local storage
- Your assignments persist between sessions
- No need to manually save or worry about losing work
- Reset to defaults option available when needed

### ⚙️ Configuration Options
- Edit role details including name, description, and desired student count
- Modify the student roster at any time
- Import/export functionality for easy class setup
- Duplicate name prevention for both students and roles

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start assigning roles.

## Perfect For

- Cairn program coordinators preparing for project days
- Teachers managing student leadership assignments
- Program administrators tracking role distributions
- Anyone organizing youth conservation projects with defined roles
