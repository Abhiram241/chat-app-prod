import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import SideBar from "../components/SideBar.jsx";
import ChatHold from "../components/ChatHold.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import { useState,useEffect } from "react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden  justify-around ">
            <SideBar />
            {!selectedUser ? <ChatHold /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
