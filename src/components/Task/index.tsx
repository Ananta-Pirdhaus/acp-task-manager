/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TimeOutline,
  EyeOutline,
  PencilOutline,
  TrashBinOutline,
} from "react-ionicons";
import { TaskT } from "../../types";
import { DraggableProvided } from "react-beautiful-dnd"; // Import the correct type
import { useEffect, useState } from "react";

interface TaskProps {
  task: TaskT;
  provided: DraggableProvided; // Use DraggableProvided type instead of 'any'
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void; // Add onView function prop
}

const Task = ({ task, provided, onEdit, onDelete, onView }: TaskProps) => {
  const {
    title,
    description,
    priority,
    startDate,
    endDate,
    startTime,
    endTime, // Assuming the task may have an `endTime` if the task ends on the same day
    image,
    alt,
    tags,
  } = task;

  const [progress, setProgress] = useState<number>(task.progress || 0); // Default to task's initial progress or 0

  // Retrieve the progress from localStorage
  useEffect(() => {
    const savedBoard = localStorage.getItem("taskBoard");
    if (savedBoard) {
      const boardData = JSON.parse(savedBoard);

      // Find the task by id and update the progress if it exists
      const taskFromStorage = Object.values(boardData)
        .flatMap((column: any) => column.items)
        .find((item: any) => item.id === task.id);

      if (taskFromStorage && taskFromStorage.progress) {
        setProgress(taskFromStorage.progress);
      }
    }
  }, [task.id]);

  // Convert start and end times to Date objects
  const startDateTime = new Date(`${startDate}T${startTime}`);
  let endDateTime;

  // If the task ends on the same day, use the `endTime`; otherwise, use the `endDate`
  if (startDate === endDate && endTime) {
    endDateTime = new Date(`${endDate}T${endTime}`);
  } else {
    endDateTime = new Date(endDate);
  }

  // Calculate the difference in milliseconds
  const durationInMilliseconds =
    endDateTime.getTime() - startDateTime.getTime();

  // Calculate the duration in hours and days
  const durationInHours = Math.round(durationInMilliseconds / (1000 * 60 * 60)); // Convert to hours
  const durationInDays = Math.round(
    durationInMilliseconds / (1000 * 60 * 60 * 24)
  ); // Convert to days

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {image && alt && (
        <img src={image} alt={alt} className="w-full h-[170px] rounded-lg" />
      )}
      <div className="flex items-center gap-2">
        {tags &&
          tags.map((tag) => (
            <span
              key={tag.title}
              className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </span>
          ))}
      </div>
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>

      {/* Progress Bar Section */}
      <div className="w-full flex items-center justify-between">
        <span className="text-[13px] text-gray-700">Progress:</span>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-[13px] text-gray-700">{progress}%</span>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#666"} width="19px" height="19px" />
          <span className="text-[13px] text-gray-700">
            {durationInDays > 0
              ? `${durationInDays} day${durationInDays > 1 ? "s" : ""}`
              : `${durationInHours} hour${durationInHours > 1 ? "s" : ""}`}
          </span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-orange-500"
              : "bg-blue-500"
          }`}
        ></div>
        <div className="flex gap-3 items-center">
          {/* View button */}
          <button onClick={onView} className="flex items-center text-gray-600">
            <EyeOutline color={"#666"} />
          </button>
          {/* Edit button */}
          <button onClick={onEdit} className="flex items-center text-gray-600">
            <PencilOutline color={"#666"} />
          </button>
          {/* Delete button */}
          <button
            onClick={onDelete}
            className="flex items-center text-gray-600"
          >
            <TrashBinOutline color={"#666"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
