import React, { useState, useEffect } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { toast } from "react-toastify"; // Import toast for notifications
import ToastProvider from "../../helpers/onNotifications"; // Import ToastProvider
import { TaskT, Columns } from "../../types";

// Interfaces remain unchanged...
// [Your existing Tag and TaskData interfaces here]

const EditModal = ({
  isOpen,
  onClose,
  setOpen,
  handleEditTask,
  currentTaskData,
}: {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditTask: (task: TaskT) => void;
  currentTaskData: TaskT | null;
}) => {
  const defaultTaskData: TaskT = {
    id: "",
    title: "",
    description: "",
    priority: "low",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    progress: 0,
    alt: "",
    image: "",
    tags: [],
  };

  const [taskData, setTaskData] = useState<TaskT>(
    currentTaskData || defaultTaskData
  );
  const [tagTitle, setTagTitle] = useState<string>("");

  useEffect(() => {
    setTaskData(currentTaskData || defaultTaskData); // Update task data from props or use defaults
  }, [currentTaskData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData((prevData) => ({
            ...prevData,
            image: e.target.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() === "") return;

    const { bg, text } = getRandomColors();
    const newTag = { title: tagTitle.trim(), bg, text };

    // Avoid duplicate tags
    if (!taskData.tags.some((tag) => tag.title === newTag.title)) {
      setTaskData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      toast.success(`Tag "${newTag.title}" added!`); // Notify success
    } else {
      toast.error("Tag already exists."); // Notify error
    }

    setTagTitle("");
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(currentTaskData || defaultTaskData); // Reset task data
  };

  const handleSubmit = () => {
    const requiredFields: (keyof TaskT)[] = [
      "title",
      "priority",
      "description",
      "startDate",
      "startTime",
      "endDate",
      "endTime",
    ];
    const isValid = requiredFields.every((field) => taskData[field] || "");

    if (!isValid) {
      toast.error("Please fill in all required fields."); // Notify error
      return;
    }

    handleEditTask(taskData); // Pass taskData to parent function
    closeModal(); // Close the modal
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0  ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6 overflow-y-auto max-h-[80vh]">
        {/* Input for task progress */}
        <label className="w-full text-sm">Progress: {taskData.progress}%</label>
        <input
          type="range"
          name="progress"
          min="0"
          max="100"
          value={taskData.progress || 0}
          onChange={handleChange}
          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
        />

        <input
          type="text"
          name="title"
          value={taskData.title || ""}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <select
          name="priority"
          onChange={handleChange}
          value={taskData.priority || ""}
          className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={taskData.startDate || ""}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="time"
          name="startTime"
          value={taskData.startTime || ""}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="date"
          name="endDate"
          value={taskData.endDate || ""}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="time"
          name="endTime"
          value={taskData.endTime || ""}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
        <div className="w-full">
          {taskData.tags.length > 0 && <span>Tags:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-4 justify-between">
          <input
            type="text"
            name="alt"
            value={taskData.alt || ""}
            onChange={handleChange}
            placeholder="Image Alt"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        {taskData.image && (
          <img
            src={taskData.image}
            alt={taskData.alt || "Uploaded Image"}
            className="w-full h-60 object-cover rounded-md my-4"
          />
        )}
        <div className="w-full flex gap-3 justify-center">
          <button
            onClick={handleSubmit}
            className="w-full py-2 rounded-md bg-blue-500 text-white"
          >
            Save Task
          </button>
          <button
            onClick={closeModal}
            className="w-full py-2 rounded-md bg-red-500 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
