// The aim here is to save the theme to the local storage so that whenever a user tries to use the web page , he or she is able to fetch the last selected theme

import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "wireframe",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
