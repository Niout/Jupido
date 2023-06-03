import { useState, useEffect } from "react";

import { Modal } from "react-web-modal";
import { useGlobalState } from "../context/GlobalStateProvider";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import LoadButton from "./LoadButton";
import useRequest from "../hooks/useRequest";
import TodoType from "../types/TodoType";

interface Props {
  setTodoList: (todos: any) => void;
}

function AddModal({ setTodoList }: Props) {
  // UseGlobalState
  const { globalState, setGlobalState } = useGlobalState();
  // UseState
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //useRequest
  const { post } = useRequest();
  // useEffect
  useEffect(() => {
    if (globalState.isModalOpen) setIsOpen(globalState.isModalOpen);
  }, [globalState.isModalOpen]);

  useEffect(() => {
    setGlobalState((prevState) => ({
      ...prevState,
      isModalOpen: isOpen,
    }));
  }, [isOpen]);

  // Functions
  const Header = () => {
    return (
      <div className="flex items-center justify-between p-2">
        <IonIcon
          className="text-3xl cursor-pointer"
          icon={closeOutline}
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <p className="text-2xl font-semibold">New todo</p>
        <div className="w-6"></div>
      </div>
    );
  };

  function addTodo() {
    setIsButtonLoading(true);
    if (title === "" || description === "") {
      setIsButtonLoading(false);
      return;
    }
    post("items/", { title, description }, false, true).then((res) => {
      if (res !== null) {
        const newTodo = res as TodoType;
        setTodoList((prevState: any) => [...prevState, newTodo]);
        setTitle("");
        setDescription("");
      }
      setIsButtonLoading(false);
      setIsOpen(false);
    });
  }

  // Render
  return (
    <Modal isVisible={isOpen} setIsVisible={setIsOpen} header={Header()}>
      <div className="flex flex-col items-center justify-start p-4 space-y-5 min-h-[70vh] relative">
        <input
          className="w-[90%] text-2xl lg:max-w-[500px] p-2 outline-none border-gray-400 border-b-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          rows={8}
          className="w-[90%] lg:max-w-[500px] p-2 rounded-md outline-none resize-none"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <LoadButton
          isLoading={isButtonLoading}
          loaderColor="white"
          size={25}
          onClick={() => {
            addTodo();
          }}
          className="w-[90%] lg:max-w-[500px] loading-button absolute bottom-5"
        >
          Add
        </LoadButton>
      </div>
    </Modal>
  );
}

export default AddModal;
