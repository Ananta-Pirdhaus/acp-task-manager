import React, { useState } from "react";
import { Columns, TaskT } from "../../types";
import AddModal from "../../components/Modals/AddModal";
import EditModal from "../../components/Modals/EditModal";
import { toast } from "react-toastify"; // Import toast for notifications
import ToastProvider from "../../helpers/onNotifications";

// Helper function to fetch project data from localStorage
const getProjectDataFromLocalStorage = (): TaskT[] => {
  const storedData = localStorage.getItem("taskBoard");
  if (storedData) {
    const board: Columns = JSON.parse(storedData);
    return Object.values(board).flatMap((column) =>
      column.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        priority: item.priority,
        startDate: item.startDate,
        endDate: item.endDate,
        startTime: item.startTime,
        endTime: item.endTime,
        tags: item.tags,
        progress: item.progress,
        image: item.image,
        alt: item.alt,
      }))
    );
  }
  return [];
};

// Function to calculate project duration
const calculateDuration = (
  startDate: string,
  endDate: string,
  startTime?: string,
  endTime?: string
): string => {
  const start = new Date(`${startDate}T${startTime || "00:00"}`);
  const end = new Date(`${endDate}T${endTime || "23:59"}`);

  if (startDate === endDate) {
    const diffHours =
      Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return `${Math.floor(diffHours)} jam`;
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays} hari`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} minggu`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} bulan`;
  }
};

const Project: React.FC = () => {
  const projectData: TaskT[] = getProjectDataFromLocalStorage();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TaskT | null>(null);

  const openAddModal = () => setAddModalOpen(true);
  const openEditModal = (project: TaskT) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };
  const closeModals = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedProject(null);
  };

  // Function to handle adding a task
  const handleAddTask = (task: TaskT) => {
    // Logic to add task (e.g., update localStorage, API, etc.)
    console.log("Task added", task);
    toast.success("Task berhasil ditambahkan!"); // Show success notification
    closeModals();
  };

  // Function to handle editing a task
  const handleEditTask = (task: TaskT) => {
    // Logic to edit task (e.g., update localStorage, API, etc.)
    console.log("Task edited", task);
    toast.success("Task berhasil diedit!"); // Show success notification
    closeModals();
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId: string) => {
    // Logic to delete task (e.g., remove from localStorage, API, etc.)
    console.log("Task deleted", taskId);
    toast.success("Task berhasil dihapus!"); // Show success notification
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Daftar Proyek</h1>

      <table className="min-w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deskripsi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioritas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Range Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tag
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projectData.map((project, index) => (
            <tr
              key={project.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.priority}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {calculateDuration(
                  project.startDate,
                  project.endDate,
                  project.startTime,
                  project.endTime
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag.title}
                    className="mr-2"
                    style={{ color: tag.text, backgroundColor: tag.bg }}
                  >
                    {tag.title}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={openAddModal}
                  className=" px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500"
                >
                  Tambah
                </button>
                <button
                  onClick={() => openEditModal(project)}
                  className="mx-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(project.id)}
                  className=" px-4 py-2 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Components */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={closeModals}
        setOpen={setAddModalOpen}
        handleAddTask={handleAddTask}
      />
      {selectedProject && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeModals}
          setOpen={setEditModalOpen}
          handleEditTask={handleEditTask}
          currentTaskData={selectedProject}
        />
      )}

      {/* ToastProvider should be at the root of the app */}
      <ToastProvider />
    </div>
  );
};

export default Project;
