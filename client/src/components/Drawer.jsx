// import { useAuth } from "@/store";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Logout from "./Logout";

import { dashBoardLinks, roleBasedPathPermissions } from "@/utils/constants";
import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router";
// import { useAuth } from "@/store";

export default function Drawer({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  // const user = useAuth();
  const path = location.pathname;

  const roles = ["patient", "doctor", "admin", "nurse", "staff"];

  //match user role based of our roles array using the find method
  const userRole = roles.find((role) => role === user?.role);
  const isAuthorized =
    (userRole === "admin" && roleBasedPathPermissions.admin.allowedSubpaths) ||
    (userRole === "doctor" &&
      roleBasedPathPermissions.doctor.allowedSubpaths) ||
    (userRole === "patient" &&
      roleBasedPathPermissions.patient.allowedSubpaths) ||
    (userRole === "nurse" && roleBasedPathPermissions.nurse.allowedSubpaths) ||
    (userRole === "staff" && roleBasedPathPermissions.staff.allowedSubpaths);

  useEffect(() => {
    const allowedPaths =
      roleBasedPathPermissions[userRole]?.allowedSubpaths || [];
    const isPathAllowed = allowedPaths.includes(path);
    if (!isAuthorized || !isPathAllowed) {
      navigate("/dashboard");
    }
  }, [isAuthorized, navigate, path, userRole]);

  return (
    <div>
      <button onClick={toggleDrawer}>
        <RiMenuLine />
      </button>
      <div
        className={`fixed top-0 left-0 z- h-full w-full bg-white shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: open ? "auto" : "no" }}
      >
        <button
          className="absolute top-6 right-4 textblack"
          onClick={toggleDrawer}
        >
          <RiCloseLine />
        </button>
        <div className="px-4 py-5 w-full h-full overflow-y-auto">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <div className="avatar avatar-placeholder">
                <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt={user?.fullname.split(" ")[0].charAt(0)}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      priority="high"
                    />
                  ) : (
                    <span className="text-sm">
                      {user?.fullname
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg">{user?.fullname}</h1>
              <p className="text-gray-500">{user?.role}</p>
            </div>
          </div>
          {/* Render Sidebar only when drawer is open */}
          {open && <Sidebar />}
          <div className="h-[calc(100vh-150px)] overflow-y-auto">
            {dashBoardLinks.map((item) => (
              <div key={item.id}>
                <p className="font-medium text-gray-500 px-3 py-2">
                  {item.title === "management" &&
                  userRole === " patient" &&
                  userRole === "patient"
                    ? ""
                    : item.title}
                </p>
                <div className="flex flex-col">
                  {item.children
                    .filter((subPaths) => {
                      if (
                        roleBasedPathPermissions[userRole] &&
                        isAuthorized.includes(subPaths.href)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((child) => (
                      <NavLink
                        to={child.href}
                        key={child.id}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `hover:text-blue-500 transition-all duration-300 px-4 py-2 flex items-center gap-2 ${
                            isActive ||
                            path.split("/")[2] === child.href.split("/")[2]
                              ? "text-blue-500 bg-blue-100 font-bold rounded-full"
                              : "text-[var(--paint-white)]"
                          }`
                        }
                        viewTransition
                        end
                      >
                        <child.Icon />
                        {child.name}
                      </NavLink>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
}
