import {
  AppsOutline,
  HomeOutline,
  LogOutOutline,
  NewspaperOutline,
  PeopleOutline,
  PieChartOutline,
} from "react-ionicons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    setIsAdmin(user?.role === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Admin-specific links
  const adminLinks = [
    {
      title: "Analytics",
      icon: <PieChartOutline color="#555" width="22px" height="22px" />,
      path: "/admin/analytics",
    },
    {
      title: "Workflows",
      icon: <PeopleOutline color="#555" width="22px" height="22px" />,
      path: "/admin/workflow",
    },
    {
      title: "Newsletter",
      icon: <NewspaperOutline color="#555" width="22px" height="22px" />,
      path: "/admin/newsletter",
    },
  ];

  // User-specific links
  const userLinks = [
    {
      title: "Home",
      icon: <HomeOutline color="#555" width="22px" height="22px" />,
      path: "/",
    },
    {
      title: "Boards",
      icon: <AppsOutline color="#555" width="22px" height="22px" />,
      path: "/boards",
    },
  ];

  // Choose which links to display based on role
  const navLinks = isAdmin ? adminLinks : userLinks;

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
          const isActive = location.pathname === link.path;
          return (
            <Link to={link.path} key={link.title} className="w-full">
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
        <div
          className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200 w-full"
          onClick={handleLogout}
        >
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
