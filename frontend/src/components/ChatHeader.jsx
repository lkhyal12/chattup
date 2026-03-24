import React, { useEffect } from "react";
import { useChatStore } from "../../store/chatStore";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setSelectedUser(null);
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedUser]);
  return (
    <div className="flex items-center justify-between bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3 ">
        <div className={`avatar online`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h2 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h2>
          <p className="text-sm text-slate-400">Online</p>
        </div>
      </div>

      <button>
        <XIcon
          className="size-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          onClick={() => setSelectedUser(null)}
        />
      </button>
    </div>
  );
};

export default ChatHeader;
