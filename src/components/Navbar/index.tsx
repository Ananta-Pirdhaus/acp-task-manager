import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  NotificationsOutline,
  PersonCircle,
  SearchOutline,
  SettingsOutline,
  ShareSocialOutline,
} from "react-ionicons";
import { Menu } from "@headlessui/react";
import { TaskT, Columns } from "../../types";
import { NotificationMenuItems } from "../Dropdown/notificationDropdown";

const Navbar: React.FC = () => {
  const [highPriorityTasks, setHighPriorityTasks] = useState<TaskT[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Update the list of high-priority tasks
  const updateHighPriorityTasks = () => {
    const taskBoardData = localStorage.getItem("taskBoard");
    if (taskBoardData) {
      const parsedData: Columns = JSON.parse(taskBoardData); // Ensure taskBoard is parsed to `Columns` type
      const highPriority = Object.values(parsedData)
        .flatMap((section) => section.items)
        .filter((task) => task.priority === "high"); // Filter tasks with high priority
      setHighPriorityTasks(highPriority);
    }
  };

  // Effect hook to run on initial load and when localStorage changes
  useEffect(() => {
    updateHighPriorityTasks();
    window.addEventListener("storage", updateHighPriorityTasks); // Listen for changes to `localStorage`

    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    setIsAdmin(user?.role === "admin");

    return () => {
      window.removeEventListener("storage", updateHighPriorityTasks); // Cleanup on component unmount
    };
  }, []); // Empty dependency array ensures this runs once after mount

  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
      {/* User Info */}
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="#fb923c" width={"28px"} height={"28px"} />
        <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
          Board Name
        </span>
        <ChevronDown color="#fb923c" width={"16px"} height={"16px"} />
      </div>

      {/* Search Bar */}
      <div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
        <SearchOutline color={"#999"} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 outline-none text-[15px]"
        />
      </div>

      {/* Navbar Actions */}
      <div className="md:flex hidden items-center gap-4">
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <ShareSocialOutline color={"#444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <SettingsOutline color={"#444"} />
        </div>

        {/* Notifications with Count - Only show for non-admins */}
        {!isAdmin && (
          <Menu as="div" className="relative">
            <Menu.Button className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
              <NotificationsOutline color={"#444"} />
              {/* Show notification count if there are high priority tasks */}
              {highPriorityTasks.length > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs rounded-full px-1">
                  {highPriorityTasks.length}
                </span>
              )}
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg outline-none">
              <NotificationMenuItems />
            </Menu.Items>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
