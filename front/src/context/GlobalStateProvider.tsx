import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface GlobalStateInterface {
  isLoggedIn: boolean | null;
  isModalOpen: boolean;
  isOnList: boolean;
}

const GlobalStateContext = createContext({
  globalState: {} as Partial<GlobalStateInterface>,
  setGlobalState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
  children,
  value = {
    isModalOpen: false,
    isLoggedIn: null,
    isOnList: true,
  } as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [globalState, setGlobalState] = useState(value);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
