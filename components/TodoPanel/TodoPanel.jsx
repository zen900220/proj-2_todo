import React, { useContext } from "react";
import "./TodoPanel.scss";
import { AppContext } from "@/context/AppContext";
import Todo from "../Todo/Todo";
import { Masonry } from "@mui/lab";

const TodoPanel = () => {
  const context = useContext(AppContext);

  return (
    <div className="todo-panel">
      {context.appState.todos.length === 0 ? undefined : (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{ margin: 0 }}
        >
          {context.appState.todos.map((todo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default TodoPanel;
