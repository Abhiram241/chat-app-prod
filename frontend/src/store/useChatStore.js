import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../libs/axios";
import { useAuthStore } from "../store/useAuthStore.js";

export const useChatStore = create((set, get) => ({
  isUsersLoading: false,
  messages: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
      console.log(res.data);
      set({ messages: res.data.messages });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      console.log("The data give was ", res.data);
      set({
        messages: Array.isArray(messages)
          ? [...messages, res.data]
          : [res.data],
      });
    } catch (error) {
      toast.error("Failed to send message");
      console.log(error);
      console.log(error.response.data.message);
    }
  },
  // listen to messages

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    console.log("Socket ID acquired is:", socket.id);

    socket.on("newMessage", (newMessage) => {
      
      const isMessageSentFromUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromUser) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  //clean up code
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  // we will optimize it later
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
