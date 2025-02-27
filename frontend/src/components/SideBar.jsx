import React, { useRef } from "react";
import { MessageSquare, Users, ToggleRight } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SideBarSkeleton.jsx";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const SideBar = () => {
  const { getUsers, users, selectedUsers, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const checkbox = useRef(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Toggle function for checkbox
  const handleToggle = () => {
    if (checkbox.current) {
      checkbox.current.checked = !checkbox.current.checked;
      setShowOnlineOnly(checkbox.current.checked);
    }
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  console.log(onlineUsers);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div
      className="h-full w-25 lg:w-72 border-r border-base-300 
      flex flex-col transition-all duration-200"
    >
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          {/* Toggle Right Icon for mobile */}
          <div className="lg:hidden">
            <ToggleRight
              className="w-6 h-6 cursor-pointer"
              onClick={handleToggle}
            />
          </div>

          {/* Contacts text for larger screens */}
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="hidden mt-3 lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              id="online"
              checked={showOnlineOnly}
              className="checkbox checkbox-sm"
              ref={checkbox}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            <span className="text-sm">Show online users only</span>
          </label>
          <span className="text-sm text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUsers ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 size-3 right-0 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate"> {user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {" "}
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        <div className="flex justify-center items-center">
          {filteredUsers.length === 0 && (
            <span className="text-sm text-zinc-500 flex items-center">
              No users found
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
