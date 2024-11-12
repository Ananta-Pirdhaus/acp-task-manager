/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Columns, TaskData } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import EditModal from "../../components/Modals/EditModal";
import ViewModal from "../../components/Modals/ViewModal";
import Task from "../../components/Task";
import { toast } from "react-toastify";
import ToastProvider from "../../helpers/onNotifications"; // Import ToastProvider component
import GenerateModal from "../../components/Modals/GenerateModal";

// Function to get initial columns from localStorage
const getInitialColumns = (): Columns => {
  const storedData = localStorage.getItem("taskBoard");
  return storedData ? JSON.parse(storedData) : {}; // Return an empty object if no data is found
};

const Home = () => {
  const [columns, setColumns] = useState<Columns>(getInitialColumns());
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<any>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // Update localStorage whenever the columns are changed
  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(columns));
  }, [columns]);

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openViewTaskModal = (task: TaskData) => {
    setSelectedTask(task); // Set the selected task details
    setViewModalOpen(true); // Open the View Modal
    setEditModalOpen(false); // Ensure the Edit Modal is closed
  };

  const openEditModal = (task: TaskData) => {
    setSelectedTask(task); // Set the selected task details
    setEditModalOpen(true); // Open the Edit Modal
    setViewModalOpen(false); // Ensure the View Modal is closed
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleAddTask = (taskData: TaskData) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard);
    toast.success("Task added successfully!"); // Show notification when a task is added
  };

  const handleEditTask = (updatedTask: TaskData) => {
    const newColumns = { ...columns };

    const columnId = Object.keys(newColumns).find((id) =>
      newColumns[id].items.some((task) => task.id === updatedTask.id)
    );

    if (!columnId) {
      console.error("Column not found for task:", updatedTask.id);
      return;
    }

    const taskIndex = newColumns[columnId].items.findIndex(
      (task) => task.id === updatedTask.id
    );
    if (taskIndex === -1) {
      console.error("Task not found:", updatedTask.id);
      return;
    }

    newColumns[columnId].items[taskIndex] = updatedTask;
    setColumns(newColumns);
    toast.info("Task updated successfully!"); // Show notification when a task is updated
  };

  const handleDeleteTask = (taskId: any) => {
    const newColumns = { ...columns };

    const columnId = Object.keys(newColumns).find((id) =>
      newColumns[id].items.some((task) => task.id === taskId)
    );

    if (!columnId) {
      console.error("Column not found for task:", taskId);
      return;
    }

    newColumns[columnId].items = newColumns[columnId].items.filter(
      (task) => task.id !== taskId
    );

    setColumns(newColumns); // Update state with new columns
    toast.error("Task deleted successfully!"); // Show notification when a task is deleted
  };

  return (
    <>
      <ToastProvider options={{ position: "top-right", autoClose: 3000 }} />{" "}
      {/* Add ToastProvider component */}
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-2 gap-10">
          {Object.entries(columns).map(([columnId, column]: [string, any]) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: any) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided: any) => (
                          <Task
                            provided={provided}
                            task={task}
                            onView={() => openViewTaskModal(task)}
                            onEdit={() => openEditModal(task)}
                            onDelete={() => handleDeleteTask(task.id)} // Pass delete function
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
              >
                <AddOutline color={"#555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      {/* Modal Components */}
      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
      {selectedTask && (
        <>
          <EditModal
            isOpen={editModalOpen}
            onClose={closeEditModal}
            setOpen={setEditModalOpen}
            handleEditTask={handleEditTask}
            currentTaskData={selectedTask}
          />
          <ViewModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)} // Close the correct modal
            task={selectedTask} // Pass the selected task to the modal
          />
        </>
      )}
      <GenerateModal />
    </>
  );
};

export default Home;
