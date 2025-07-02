"use client";

import { logoutAction } from "../../app/actions/actions";
import {
    ArrowLeft,
    ArrowRight,
    Columns4,
    LayoutDashboard,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const sidebarData = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    link: "/admin/dashboard",
  },
  {
    label: "Blogs",
    icon: <Columns4 />,
    link: "/admin/blogs",
  },
   {
    label: "Services",
    icon: <Columns4 />,
    link: "/admin/services",
  },
  {
    label: "Gallery",
    icon: <Columns4 />,
    link: "/admin/gallery",
  }
];

const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = (path) => path === pathName;
  const [toggle, setToggle] = useState(false);

  // const handlelogout = async () => {
  //   try {
  //     const response = await axios.get("/api/admin/logout");
  //     if (response?.data?.success) {
  //       toast.success("logout successful");
  //       router.push("/login");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-700 ${
        toggle ? "w-64" : "w-16"
      } bg-gray-100 dark:bg-gray-800`}
    >
      <div className="h-full px-3 py-4  relative">
        <button
          className={`absolute transition-all duration-700 ease-in-out  top-4 border-2 p-1 rounded-full hover:bg-slate-800 border-slate-800 hover:text-white right-3`}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <ArrowLeft /> : <ArrowRight />}
        </button>
        <ul className="space-y-2 font-medium mt-16">
          {sidebarData.map((item) => (
            <li key={item.label}>
              <Link
                href={item.link}
                className={`flex items-center p-2 rounded-lg ${
                  isActive(item.link)
                    ? "bg-gray-400 text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition-all duration-300`}
              >
                <div className="w-5">{item.icon}</div>
                <span
                  className={`ms-3 transition-opacity duration-300 ${
                    toggle ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {toggle && item.label}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={()=>{
                logoutAction().then((res)=>{
                  if(res.success){
                    router.push("/login");
                  }
                })
              }}
            >
              <LogOut size={25} />
              <span
                className={`ms-3 transition-opacity duration-300 ${
                  toggle ? "opacity-100" : "opacity-0"
                }`}
              > 
                {toggle && "Logout"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
