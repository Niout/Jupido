import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadPage from "./LoadPage";
import { useGlobalState } from "../context/GlobalStateProvider";
import useRequest from "../hooks/useRequest";

function ProtectedRoute() {
  // UseGlobalState
  const { setGlobalState } = useGlobalState();
  // UseState
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //useRequest
  const { get } = useRequest();
  // useEffect
  useEffect(() => {
    get("user/", false, true).then((res) => {
      if (res !== null) {
        setGlobalState((prevState) => ({
          ...prevState,
          isLoggedIn: true,
        }));
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);
  // Render
  if (isLoading) return <LoadPage />;
  return isLoggedIn ? <Outlet /> : <></>;
}

export default ProtectedRoute;
