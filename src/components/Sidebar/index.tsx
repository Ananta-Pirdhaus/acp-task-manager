import {
  AppsOutline,
  GridOutline,
  HomeOutline,
  LogOutOutline,
  NewspaperOutline,
  NotificationsOutline,
  PeopleOutline,
  PieChartOutline,
} from "react-ionicons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Use useLocation to get current path

  const navLinks = [
    {
      title: "Home",
      icon: <HomeOutline color="#555" width="22px" height="22px" />,
      path: "/", // Set the path for navigation
    },
    {
      title: "Boards",
      icon: <AppsOutline color="#555" width="22px" height="22px" />,
      path: "/boards", // Set the path for navigation
    },
    {
      title: "Projects",
      icon: <GridOutline color="#555" width="22px" height="22px" />,
      path: "/project", // Example path
    },
    {
      title: "Analytics",
      icon: <PieChartOutline color="#555" width="22px" height="22px" />,
      path: "/analytics", // Example path
    },
    {
      title: "Workflows",
      icon: <PeopleOutline color="#555" width="22px" height="22px" />,
      path: "/workflows", // Example path
    },
    {
      title: "Notifications",
      icon: <NotificationsOutline color="#555" width="22px" height="22px" />,
      path: "/notifications", // Example path
    },
    {
      title: "Newsletter",
      icon: <NewspaperOutline color="#555" width="22px" height="22px" />,
      path: "/newsletter", // Example path
    },
  ];

  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col z-10">
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
        <span className="text-orange-400 font-semibold text-2xl md:block hidden">
          Logo.
        </span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">
          L.
        </span>
      </div>
      <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path; // Check if the current path matches the link path
          return (
            <Link to={link.path} key={link.title} className="w-full">
              {" "}
              {/* Ensure Link has w-full */}
              <div
                className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer transition-colors duration-300 ${
                  isActive ? "bg-orange-300" : "bg-transparent"
                }`}
              >
                {link.icon}
                <span className="font-medium text-[15px] md:block hidden">
                  {link.title}
                </span>
              </div>
            </Link>
          );
        })}
        <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200 w-full">
          {" "}
          {/* Added w-full */}
          <LogOutOutline />
          <span className="font-medium text-[15px] md:block hidden">
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
