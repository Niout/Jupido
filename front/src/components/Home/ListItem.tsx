import { useEffect, useState } from "react";
import TodoType from "../../types/TodoType";
import useRequest from "../../hooks/useRequest";

interface Props {
  todo: TodoType;
  onClick: () => void;
}

function ListItem({ todo, onClick }: Props) {
  // UseState
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  //useRequest
  const { post } = useRequest();

  // UseEffect
  useEffect(() => {
    setIsDone(todo.done);
  }, [todo.done]);

  // Function

  function handleStatusChange() {
    if (isDisabled) {
      return;
    }
    post("items/" + todo.id + "/status/", { done: !isDone }).then((res) => {
      if (res !== null) {
        setIsDone(!isDone);
      }
      setIsDisabled(false);
    });
  }

  // Render
  return (
    <div
      className="w-full flex justify-between items-center p-2 border-b border-gray-200 cursor-pointer duration-200"
      onClick={() => {
        onClick();
      }}
    >
      <p className="text-gray-900 font-medium">{todo.title}</p>
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-gray-600"
        checked={isDone}
        onChange={() => {
          setIsDisabled(true);
          handleStatusChange();
        }}
        disabled={isDisabled}
      />
    </div>
  );
}

export default ListItem;
