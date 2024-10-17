/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import taskImage from "../assets/images/task.jpg";
import taskImage2 from "../assets/images/task2.jpg";
import taskImage3 from "../assets/images/task3.jpg";
import { Columns } from "../types";
import { getRandomColors } from "../helpers/getRandomColors";

// Definisi objek Board dengan properti progress
export const Board: Columns = {
  backlog: {
    name: "Backlog",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        startDate: "2024-10-10",
        endDate: "2024-10-20",
        startTime: "09:00",
        image: taskImage2,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 0, // New progress property
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        startDate: "2024-10-11",
        endDate: "2024-10-21",
        startTime: "10:00",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 20, // New progress property
      },
    ],
  },
  pending: {
    name: "Pending",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "high",
        startDate: "2024-10-12",
        endDate: "2024-10-22",
        startTime: "11:00",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 40, // New progress property
      },
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        startDate: "2024-10-13",
        endDate: "2024-10-23",
        startTime: "12:00",
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 50, // New progress property
      },
    ],
  },
  todo: {
    name: "To Do",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        startDate: "2024-10-14",
        endDate: "2024-10-24",
        startTime: "13:00",
        image: taskImage3,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 70, // New progress property
      },
    ],
  },
  doing: {
    name: "Doing",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        startDate: "2024-10-15",
        endDate: "2024-10-25",
        startTime: "14:00",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 80, // New progress property
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        startDate: "2024-10-16",
        endDate: "2024-10-26",
        startTime: "15:00",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 60, // New progress property
      },
    ],
  },
  done: {
    name: "Done",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "high",
        startDate: "2024-10-17",
        endDate: "2024-10-27",
        startTime: "16:00",
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        progress: 100, // New progress property
      },
    ],
  },
};

// Menyimpan Board ke Local Storage
localStorage.setItem("taskBoard", JSON.stringify(Board));

// Mengambil data dari Local Storage dan mengonversinya kembali ke objek JavaScript
const savedBoard = localStorage.getItem("taskBoard");
if (savedBoard) {
  const boardData = JSON.parse(savedBoard);
  console.log(boardData); // Menampilkan data yang diambil dari Local Storage
}
