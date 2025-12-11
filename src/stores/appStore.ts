"use client";

import { create } from "zustand";

type SideMenuType = "toggled" | "collapse" | "hidden";

interface IAppDrawer {
  open: boolean;
  component: any | null;
}

interface AppState {
  theme: "light" | "dark";
  sideMenu: SideMenuType;
  appDrawer: IAppDrawer;
  setTheme: (theme: "light" | "dark") => void;
  toggleSideMenu: (sideMenu: SideMenuType) => void;
  setAppDrawer: (appDrawer: IAppDrawer) => void;
}

const initialState = {
  appDrawer: { open: false, component: null },
};

export const useApp = create<AppState>((set) => ({
  ...initialState,
  sideMenu: "toggled",
  theme: "light",
  setTheme: (theme: "light" | "dark") => set({ theme }),
  toggleSideMenu: (sideMenu: SideMenuType) => set({ sideMenu }),
  setAppDrawer: (appDrawer: IAppDrawer) => set({ appDrawer }),
}));
