import { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalStateProvider";
import { useLocation } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronBack, menuOutline } from "ionicons/icons";
function Navbar() {
  // UseGlobalState
  const { globalState, setGlobalState } = useGlobalState();
  // UseLocation
  const location = useLocation();
  //UseState
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  // useEffect
  useEffect(() => {
    if (globalState.isLoggedIn) setIsLoggedIn(globalState.isLoggedIn);
  }, [globalState.isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      if (minutes < 10) setTime(`${hours}:0${minutes}`);
      else setTime(`${hours}:${minutes}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Render
  if (!isLoggedIn || time === "" || location.pathname !== "/")
    return (
      <div className="left-5 right-5 grid grid-cols-3 fixed top-0 bg-white h-[80px]">
        <div className="col-span-1 flex items-center justify-start">
          <p className="text-2xl md:text-3xl font-semibold duration-200">
            Jupido
          </p>
        </div>
      </div>
    );
  return (
    <div className="left-5 right-5 grid grid-cols-3 fixed top-0 bg-white h-[80px]">
      <div className="col-span-1 flex items-center justify-start">
        <p className="hidden md:block text-2xl md:text-3xl font-semibold duration-200">
          Jupido
        </p>
        <IonIcon
          icon={globalState.isOnList ? menuOutline : chevronBack}
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              isOnList: !prevState.isOnList,
            }));
          }}
          className="md:hidden text-3xl cursor-pointer"
        />
      </div>
      <div className="col-span-1 flex items-center justify-center">
        {/* display time */}
        <p className="hidden sm:block text-2xl text-center font-semibold duration-200">
          {time}
        </p>
      </div>
      <div className="col-span-1 flex items-center justify-end">
        <button
          className="text-base md:text-xl text-white bg-[#D14A5C] hover:bg-[#9b3744] duration-200 rounded-md p-2"
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              isModalOpen: true,
            }));
          }}
        >
          New todo
        </button>
      </div>
    </div>
  );
}

export default Navbar;
