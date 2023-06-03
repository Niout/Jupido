import { Toast } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const server_url = "https://api.jupido.jupitr.fr";
export const login_url = "/login";

var header: any = {
  "Content-Type": "application/json",
};

function useRequest(url?: string | null) {
  // UseNavigate
  const navigate = useNavigate();

  // Create Axios instance with baseURL
  const instance = axios.create({
    baseURL: url ? url : server_url,
    headers: header,
  });

  // Functions
  function get(
    r_path: string,
    redirect?: boolean,
    withCredentials: boolean = true
  ) {
    if (!url) url = "";
    return instance
      .get(r_path, {
        withCredentials: withCredentials ? true : false,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return error_handler(err, redirect);
      });
  }

  function post(
    r_path: string,
    data: any,
    redirect?: boolean,
    withCredentials: boolean = true
  ) {
    if (!url) url = "";
    return instance
      .post(r_path, data, {
        withCredentials: withCredentials ? true : false,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return error_handler(err, redirect);
      });
  }

  function deleteItem(
    r_path: string,
    redirect?: boolean,
    withCredentials: boolean = true
  ) {
    if (!url) url = "";
    return instance
      .delete(r_path, {
        withCredentials: withCredentials ? true : false,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return error_handler(err, redirect);
      });
  }

  function put(
    r_path: string,
    data: any,
    redirect?: boolean,
    withCredentials: boolean = true
  ) {
    if (!url) url = "";
    return instance
      .put(r_path, data, {
        withCredentials: withCredentials ? true : false,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return error_handler(err, redirect);
      });
  }

  function error_handler(error: any, redirect?: boolean): any {
    if (error.response) {
      if (error.response.status === 403) {
        navigate("/login");
        return null;
      } else if (error.response.status === 401) {
        navigate("/login");
        return null;
      } else {
        if (error.response.data.message) {
          if (error.response.data.message.detail) {
            Toast.error(error.response.data.message.detail);
          } else {
            Toast.error(error.response.data.message);
          }
        }
      }
      if (redirect) navigate("/" + error.response.status.toString());
    } else if (error.request) {
      Toast.error(error.request);
    } else {
      Toast.error(error.message);
    }
    return null;
  }

  return { get, post, deleteItem, put };
}

export default useRequest;
