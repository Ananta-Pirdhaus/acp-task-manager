import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Board } from "../../data/board";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Main: React.FC = () => {
  // Calculate total tasks in each column
  const totalTasksBacklog = Board.backlog.items.length;
  const totalTasksPending = Board.pending.items.length;
  const totalTasksTodo = Board.todo.items.length;
  const totalTasksDoing = Board.doing.items.length;
  const totalTasksDone = Board.done.items.length;

  // Data for the chart
  const data = {
    labels: ["Backlog", "Pending", "To Do", "Doing", "Done"],
    datasets: [
      {
        label: "Task Count",
        data: [
          totalTasksBacklog,
          totalTasksPending,
          totalTasksTodo,
          totalTasksDoing,
          totalTasksDone,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Task Distribution Across Stages",
      },
    },
  };

  return (
    <div className="p-10">
      <div className="flex justify-center items-center bg-white p-4 shadow-md rounded-lg">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Main;
