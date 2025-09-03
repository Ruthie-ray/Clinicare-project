import { RiPhoneLine } from "@remixicon/react";
import React, { useState } from "react";
import Delete from "./Delete";
import { formatDate, usersRoleColors } from "@/utils/constants";
import { useAuth } from "@/store";

export default function UsersCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { user } = useAuth();

  return (
    <div>
      <div className="bg-white flex p-4 gap-3 items-start shadow rounded-xl">
        <div className="avatar avatar-placeholder">
          <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
            {item?.avatar ? (
              <img
                src={item?.avatar}
                alt={item?.fullname.split(" ")[0].charAt(0)}
                referrerPolicy="no-referrer"
                loading="lazy"
                priority="high"
              />
            ) : (
              <span className="text-sm">
                {item?.fullname
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <div>
          <h2 className="font-bold">{item?.fullname}</h2>
          <p className="text-sm text-gray-500">{item?.email}</p>
          <div
            className={`capitalize badge badge-sm font-semibold my-2 ${
              usersRoleColors[item.role]
            }`}
          >
            {item.role}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <RiPhoneLine size={17} /> {item?.phone}
          </p>
          <p className="text-sm text-gray-500">
            {" "}
            Joined: {formatDate(item?.createdAt)}
          </p>
          {user?.role === "admin" && (
            <div className="flex mt-5 mb-2 ml-30 md:ml-5 lg:ml-20 gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline border-[0.2px] border-gray-500"
                onClick={() => {
                  setIsOpen(true);
                  setUserId(item._id);
                }}
                disabled={item.role === "patient"}
              >
                Edit
              </button>
              <Delete item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
