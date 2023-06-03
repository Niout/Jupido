import { useEffect, useState } from "react";
import TodoType from "../../types/TodoType";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import useRequest from "../../hooks/useRequest";
import { useGlobalState } from "../../context/GlobalStateProvider";

interface Props {
  todo: TodoType | null;
  setTodoList: (todos: any) => void;
  setCurrentTodo: (todo: TodoType | null) => void;
}
function CurrentTodo({ todo, setTodoList, setCurrentTodo }: Props) {
  // UseGlobalState
  const { setGlobalState } = useGlobalState();
  // UseState
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  //useRequest
  const { put, deleteItem } = useRequest();
  // UseEffect
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  useEffect(() => {
    if (!todo) return;
    const timeout = setTimeout(() => {
      put("items/" + todo?.id + "/", { title, description }).then((res) => {
        if (res !== null) {
          setTitle(res.title);
          setDescription(res.description);
          setCurrentTodo({
            ...todo,
            title: res.title,
            description: res.description,
          });
        }
      });
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [title, description]);

  // Function
  function handleDelete() {
    deleteItem("items/" + todo?.id + "/").then((res) => {
      if (res !== null) {
        setTodoList((prevState: any) => {
          return prevState.filter((item: any) => item.id !== todo?.id);
        });
        setCurrentTodo(null);
        setGlobalState((prevState) => ({
          ...prevState,
          isOnList: true,
        }));
      }
    });
  }

  // Render
  if (!todo) return null;
  return (
    <div className=" col-span-1 md:col-span-3">
      <div className="w-full flex justify-between items-center p-2 border-b border-gray-200 cursor-pointer duration-200">
        <input
          className="w-full text-2xl  p-2 outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <IonIcon
          onClick={handleDelete}
          icon={trashOutline}
          className="text-[#d14a5c] text-2xl"
        />
      </div>
      <div className="w-full flex justify-between items-center p-2  cursor-pointer duration-200">
        <textarea
          rows={15}
          className="w-full p-2 rounded-md outline-none resize-none"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default CurrentTodo;
