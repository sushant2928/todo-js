import { getTodoList, renderToDos, setTodoList } from "./script.js";

const template = document.createElement("template");

template.innerHTML = `
<div class="todo-container">    
<button class="delete-todo-btn">X</button>
<span class="todo"/>
</div>
`;

export class ToDO extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.todoContainer = this.shadowRoot.querySelector(".todo-container");
    this.todoContainer.id = this.getAttribute("id");
    this.todoContainer.style.background =
      this.getAttribute("done") === "true" && "red";
    this.todo = this.todoContainer.querySelector(".todo");
    this.todo.textContent = this.getAttribute("todo");
    this.delete = this.todoContainer.querySelector(".delete-todo-btn");
  }

  connectedCallback() {
    this.todoContainer.addEventListener("click", this.onClick);
    this.todo.addEventListener("dblclick", this.editTodo);
  }

  onClick = (event) => {
    if (event.target.classList.contains("todo")) {
      const [todoList, index] = this.findTodoIndex();
      if (index > -1) {
        this.setAttribute("done", !todoList[index].done);
        todoList[index].done = !todoList[index].done;
        this.todoContainer.style.background = todoList[index].done ? "red" : "";
        setTodoList(todoList);
      }
    } else if (event.target.classList.contains("delete-todo-btn")) {
      let todoList = getTodoList();
      if (todoList?.length) {
        todoList = todoList.filter((todo) => todo.id !== this.todoContainer.id);
        setTodoList(todoList);
        this.style.display = "none";
        renderToDos();
      }
    }
  };

  editTodo = () => {
    const editedTodo = prompt("Modify Todo here!", this.getAttribute("todo"));
    if (editedTodo) {
      const [todoList, index] = this.findTodoIndex();
      if (index > -1) {
        todoList[index].value = editedTodo;
        this.todo.textContent = editedTodo;
        setTodoList(todoList);
      }
    }
  };

  findTodoIndex() {
    let todoList = getTodoList();
    if (todoList?.length) {
      const index = todoList.findIndex(
        (todo) => todo.id === this.todoContainer.id
      );
      return [todoList, index];
    }
    return [todoList, -1];
  }
}
