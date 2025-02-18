"use client";
import React from "react";
import AuthStore from "./userStore";
import ProcessStore from "./processStore";
import SessionStore from "./sessionStore";
import UserStore from "./usersStore";
import { TaskStore } from "./taskStore";
type RootStateContextValue = {
  authStore: AuthStore;
  processStore: ProcessStore;
  sessionStore: SessionStore;
  userStore: UserStore;
  taskStore: TaskStore;
};

const RootStateContext = React.createContext<RootStateContextValue | undefined>(
  undefined
);

const authStore = new AuthStore();
const processStore = new ProcessStore();
const sessionStore = new SessionStore();
const userStore = new UserStore();
const taskStore = new TaskStore();

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const contextValue = React.useMemo(
    () => ({ authStore, processStore, sessionStore, userStore, taskStore }),
    []
  );

  return (
    <RootStateContext.Provider value={contextValue}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => {
  const context = React.useContext(RootStateContext);
  if (!context) {
    throw new Error("useRootStore must be used within a RootStateProvider");
  }
  return context;
};
