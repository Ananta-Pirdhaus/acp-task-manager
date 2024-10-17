import React, { useState, useEffect } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface TaskData {
  id: string;
  title: string;
  description: string;
  priority: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  image?: string;
  alt?: string;
  tags: Tag[];
  progress: number; // Adding progress attribute
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditTask: (taskData: TaskData) => void;
  currentTaskData: TaskData;
}

const EditModal = ({
  isOpen,
  onClose,
  setOpen,
  handleEditTask,
  currentTaskData,
}: EditModalProps) => {
  const [taskData, setTaskData] = useState<TaskData>(currentTaskData);
  const [tagTitle, setTagTitle] = useState("");

  useEffect(() => {
    setTaskData(currentTaskData); // Update task data from props
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
    const newTag: Tag = { title: tagTitle.trim(), bg, text };

    // Avoid duplicate tags
    if (!taskData.tags.some((tag) => tag.title === newTag.title)) {
      setTaskData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
    } else {
      alert("Tag already exists.");
    }

    setTagTitle("");
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(currentTaskData); // Reset task data
  };

  const handleSubmit = () => {
    const requiredFields = [
      "title",
      "priority",
      "description",
      "startDate",
      "startTime",
      "endDate",
      "endTime",
    ];
    const isValid = requiredFields.every((field) => taskData[field]);

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    handleEditTask(taskData);
    closeModal();
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
          value={taskData.progress}
          onChange={handleChange}
          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
        />

        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <select
          name="priority"
          onChange={handleChange}
          value={taskData.priority}
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
          value={taskData.startDate}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="time"
          name="startTime"
          value={taskData.startTime}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="date"
          name="endDate"
          value={taskData.endDate}
          onChange={handleChange}
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input
          type="time"
          name="endTime"
          value={taskData.endTime}
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
            value={taskData.alt}
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
          <img src={taskData.image} alt={taskData.alt} className="mt-2" />
        )}
        <button
          className="w-full rounded-md h-10 bg-green-500 text-amber-50 font-medium"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditModal;
