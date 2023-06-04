import { useEffect, useState } from "react";
import AddModal from "../components/AddModal";
import TodoType from "../types/TodoType";
import LoadPage from "../components/LoadPage";
import ListItem from "../components/Home/ListItem";
import CurrentTodo from "../components/Home/CurrentTodo";
import { useGlobalState } from "../context/GlobalStateProvider";
import useRequest from "../hooks/useRequest";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  // UseGlobalState
  const { globalState, setGlobalState } = useGlobalState();
  // UseState
  const [todoList, setTodoList] = useState<TodoType[] | null>(null);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  //useRequest
  const { get } = useRequest();
  //useNavigate
  const navigate = useNavigate();
  // UseEffect
  useEffect(() => {
    get("items/", false, true).then((res) => {
      if (res !== null) {
        setTodoList(res);
      }
      setIsLoading(false);
    });
  }, [currentTodo]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function
  function handleLogout() {
    get("/logout/").then((res) => {
      if (res !== null) {
        setGlobalState((prevState) => ({
          ...prevState,
          isLoggedIn: false,
        }));
        navigate("/login");
      }
    });
  }

  // Render
  if (isLoading) {
    return <LoadPage />;
  }
  return (
    <>
      <div className="page grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* list of todoitem */}
        <div className="col-span-1">
          {windowWidth < 768 ? (
            globalState.isOnList &&
            (todoList?.length === 0 ? (
              <div>Add your first Todo!</div>
            ) : (
              todoList?.map((todo) => (
                <ListItem
                  key={todo.id}
                  todo={todo}
                  onClick={() => {
                    setGlobalState({ isOnList: false });
                    setCurrentTodo(todo);
                  }}
                />
              ))
            ))
          ) : todoList?.length === 0 ? (
            <div>Add your first Todo!</div>
          ) : (
            todoList?.map((todo) => (
              <ListItem
                key={todo.id}
                todo={todo}
                onClick={() => {
                  setGlobalState({ isOnList: false });
                  setCurrentTodo(todo);
                }}
              />
            ))
          )}
        </div>
        {/* show current todo */}
        {windowWidth < 768 ? (
          !globalState.isOnList && (
            <CurrentTodo
              todo={currentTodo}
              setTodoList={setTodoList}
              setCurrentTodo={setCurrentTodo}
            />
          )
        ) : (
          <CurrentTodo
            todo={currentTodo}
            setTodoList={setTodoList}
            setCurrentTodo={setCurrentTodo}
          />
        )}
        {/* show current todo */}
      </div>
      <AddModal setTodoList={setTodoList} />
      <footer className="fixed left-0 right-0 gap-5 flex flex-row items-center justify-center bottom-3 text-center text-gray-500 text-sm">
        <Link to="https://boriz.gitbook.io/jupido">Docs</Link>
        <button onClick={handleLogout}>Logout</button>
      </footer>
    </>
  );
}

export default Home;
