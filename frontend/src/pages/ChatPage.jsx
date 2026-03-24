import React from "react";
import { useAuth } from "../../store/authStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActuveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatConatiner from "../components/ChatConatiner";
import NoConvirsationPlaceholder from "../components/NoConvirsationPlaceholder";
import { useChatStore } from "../../store/chatStore";

const ChatPage = () => {
  const { logout } = useAuth();
  const { selectedUser } = useChatStore();

  const { activeTab } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px] text-gray-300">
      <BorderAnimatedContainer>
        {/* left side */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2 ">
            {activeTab == "chats" ? <ChatList /> : <ContactList />}{" "}
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatConatiner /> : <NoConvirsationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
