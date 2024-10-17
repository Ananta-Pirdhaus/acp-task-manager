export type TaskT = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low"; 
  startDate: string; 
  endDate: string; 
  startTime: string; 
  endTime?: string; 
  image?: string; 
  alt?: string; 
  tags: { title: string; bg: string; text: string }[]; 
  progress: number; 
};

type Column = {
  name: string;
  items: TaskT[];
};

export type Columns = {
  [key: string]: Column;
};
