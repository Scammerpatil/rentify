import { SIDENAV_ITEMS } from "./constant";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import {
  IconChevronDown,
  IconChevronRight,
  IconMenu,
  IconMoneybag,
} from "@tabler/icons-react";
import { useUser } from "../../context/UserContext";
import ThemeToggler from "../../components/Header/ThemeToggler";

const Layout = ({ children }) => {
  const router = useNavigate();
  const { user } = useUser();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    router("/");
  };

  if (!user) return router("/login");

  return (
    <>
      <div className="drawer lg:drawer-open max-h-screen">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar justify-between bg-base-300 w-full pl-10">
            {/* Breadcrumb */}
            <div className="lg:flex items-center justify-end space-x-2 hidden text-base-content">
              <span className="text-base font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm">
                    <IconChevronRight />
                  </span>
                  <span className="text-base capitalize hover:text-primary transition">
                    {segment.replace(/-/g, " ")}
                  </span>
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <IconMenu className="h-6 w-6 text-base-content" />
              </label>
            </div>

            {/* Logo & Theme Toggle (Mobile) */}
            <div className="flex-1 justify-between lg:hidden px-2">
              <h1 className="text-xl font-bold flex items-center">
                <span className="h-7 w-7">
                  <IconMoneybag size={28} className="text-base-content" />
                </span>
                <span className="text-primary">Rentify</span>
              </h1>
              <ThemeToggler />
            </div>

            {/* Profile & Theme Toggle (Desktop) */}
            <div className="hidden lg:block">
              <ul className="menu menu-horizontal flex items-center space-x-4">
                <ThemeToggler />
                <div className="dropdown dropdown-left cursor-pointer bg-transparent">
                  <img
                    src={user.profileImage}
                    alt="Avatar"
                    className="rounded-full object-cover"
                    width={40}
                    height={40}
                    tabIndex={0}
                    role="button"
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary text-base-content rounded-full text-xl font-bold">
                        {user.name[0].toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-lg font-semibold text-base-content">
                        {user.name}
                      </span>
                    </div>
                    <hr className="my-2 border-base-content" />
                    <div className="flex flex-col">
                      <Link
                        className="text-left px-4 py-2 text-base-content hover:bg-base-200 transition duration-200"
                        to={`/user/my-account`}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-left px-4 py-2 text-base-content hover:bg-base-200 transition duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </ul>
                </div>
              </ul>
            </div>
          </div>

          {/* Page Content */}
          <main className="overflow-y-auto h-[calc(100vh-5.3rem)] bg-base-100 p-10 text-base-content">
            {children}
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <Link
              to="/user/dashboard"
              className="flex h-16 w-full flex-row items-center justify-center space-x-3 border-b border-base-content md:justify-start md:px-6"
            >
              <span className="h-7 w-7 rounded-lg bg-base-200">
                <IconMoneybag size={28} className="text-base-content" />
              </span>
              <h1 className="text-xl font-bold text-primary">Rentify</h1>
            </Link>
            <div className="flex flex-col space-y-2 mt-10 md:px-6">
              {SIDENAV_ITEMS.map((item, idx) => (
                <MenuItem key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

const MenuItem = ({ item }) => {
  const location = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  const baseClasses =
    "flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-accent";
  const activeClasses = "bg-base-300 text-base-content";
  const inactiveClasses =
    "text-base-content hover:text-base-content hover:bg-base-100";

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`${baseClasses} ${
              location.pathname.includes(item.path)
                ? activeClasses
                : inactiveClasses
            }`}
          >
            <div className="flex flex-row items-center space-x-4 text-base-content">
              {item.icon}
              <span className="text-lg font-medium">{item.title}</span>
            </div>
            <div
              className={`transition-transform ${
                subMenuOpen ? "rotate-180" : ""
              } flex`}
            >
              <IconChevronDown width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-4 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  to={subItem.path}
                  className={`block rounded-lg p-2 text-base ${
                    subItem.path === location.pathname
                      ? "font-semibold text-base-content"
                      : "text-base-content/50"
                  } hover:bg-accent`}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          to={item.path}
          className={`flex flex-row items-center space-x-4 rounded-lg p-2 ${
            item.path === location.pathname ? activeClasses : inactiveClasses
          }`}
        >
          {item.icon}
          <span className="text-lg font-medium">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
