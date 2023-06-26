import { AddToDo } from "./AddToDo.js";
import { ToDO } from "./ToDo.js";

window.customElements.define("add-todo", AddToDo);
window.customElements.define("todo-item", ToDO);

export const getTodoList = () => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

export const setTodoList = (todoList) => {
  localStorage.setItem("todos", JSON.stringify(todoList));
};
export const renderToDos = () => {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
  const todos = getTodoList();
  if (todos?.length) {
    todoList.innerHTML = todos.reduce((innerHTML, todo) => {
      return `${innerHTML} <todo-item id=${todo.id} todo=${todo.value} done=${todo.done}></todo-item>`;
    }, ``);
  }
};
renderToDos();
