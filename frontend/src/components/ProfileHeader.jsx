import React, { useRef, useState } from "react";
import { useAuth } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";
import { LogOutIcon, Volume1Icon, VolumeOffIcon } from "lucide-react";

const mouseClicked = new Audio();
const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuth();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef();
  function handleUploadImg(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function () {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  }
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between  w-full">
          {/* avatar */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef?.current?.click()}
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleUploadImg}
              accept="image/*"
            />
          </div>
          {/* username and online text */}
          <div>
            <h3
              className="text-slate-200 font-medium text-base max-w-[180px] truncate
            "
            >
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/* logout btn */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={logout}
            >
              <LogOutIcon className="size-5" />
            </button>
            {/* sound toggle btn */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => {
                mouseClicked.currentTime = 0;
                mouseClicked
                  .play()
                  .catch((err) => console.log("error playing sound ", err));
                toggleSound();
              }}
            >
              {isSoundEnabled ? (
                <Volume1Icon className="size-5" />
              ) : (
                <VolumeOffIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
