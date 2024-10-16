/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import EditModal from "../../components/Modals/EditModal";
import Task from "../../components/Task";
import { toast } from "react-toastify";
import ToastProvider from "../../helpers/onNotifications"; // Impor komponen ToastProvider

// Fungsi untuk mengambil data dari localStorage
const getInitialColumns = (): Columns => {
  const storedData = localStorage.getItem("taskBoard");
  return storedData ? JSON.parse(storedData) : {}; // Kembalikan objek kosong jika tidak ada data
};

const Home = () => {
  const [columns, setColumns] = useState<Columns>(getInitialColumns());
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<any>(null);

  // Update localStorage setiap kali kolom diubah
  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(columns));
  }, [columns]);

  const openModal = (columnId: any) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard);
    toast.success("Task added successfully!"); // Tampilkan notifikasi saat task ditambahkan
  };

  const handleEditTask = (updatedTask: any) => {
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
    toast.info("Task updated successfully!"); // Tampilkan notifikasi saat task diedit
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
    toast.error("Task deleted successfully!"); // Tampilkan notifikasi saat task dihapus
  };

  return (
    <>
      <ToastProvider options={{ position: "top-right", autoClose: 3000 }} />{" "}
      {/* Tambahkan komponen ToastProvider */}
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-2 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
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
      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
      {selectedTask && (
        <EditModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          setOpen={setEditModalOpen}
          handleEditTask={handleEditTask}
          currentTaskData={selectedTask}
        />
      )}
    </>
  );
};

export default Home;
