import React from "react";
import { useAuth } from "../../store/authStore";

const ChatPage = () => {
  const { logout } = useAuth();
  return (
    <div className="relative z-10">
      <button
        onClick={logout}
        className="text-white bg-red-500 cursor-pointer px-10 py-2 fint-bold"
      >
        logout
      </button>
    </div>
  );
};

export default ChatPage;
