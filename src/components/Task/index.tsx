/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline, PencilOutline, TrashBinOutline } from "react-ionicons";
import { TaskT } from "../../types";
import { DraggableProvided } from "react-beautiful-dnd"; // Import the correct type

interface TaskProps {
  task: TaskT;
  provided: DraggableProvided; // Use DraggableProvided type instead of 'any'
  onEdit: () => void;
  onDelete: () => void;
}

const Task = ({ task, provided, onEdit, onDelete }: TaskProps) => {
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
