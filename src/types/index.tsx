export type TaskT = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low"; // Use a union type for better safety
  startDate: string; // Format: YYYY-MM-DD
  endDate: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:mm
  endTime?: string; // Format: HH:mm, optional for same-day tasks
  image?: string; // Optional image field
  alt?: string; // Optional alt text for the image
  tags: { title: string; bg: string; text: string }[]; // Array of tag objects
};

type Column = {
  name: string;
  items: TaskT[];
};

export type Columns = {
  [key: string]: Column;
};
