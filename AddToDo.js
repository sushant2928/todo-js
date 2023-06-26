import { getTodoList, renderToDos, setTodoList } from "./script.js";

const template = document.createElement("template");

template.innerHTML = `
<div class="add-todo-container">
<form class="add-todo-form">
<input class="add-todo-input" type="text" required placeholder="Enter Todo Here..."/>
<button class="add-todo-btn">Submit</button>
</form>
</div>
`;

export class AddToDo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addToDoContainer = this.shadowRoot.querySelector(
      ".add-todo-container"
    );
    this.addToDoForm = this.addToDoContainer.querySelector(".add-todo-form");
    this.addToDoInput = this.addToDoForm.querySelector(".add-todo-input");
  }

  connectedCallback() {
    this.addToDoForm.addEventListener("submit", this.addToDo);
  }
  disconnectedCallback() {
    this.addToDoForm.removeEventListener();
  }

  addToDo = (event) => {
    event.preventDefault();
    const todos = getTodoList();
    console.log({ todos });
    todos.push({
      id: crypto.randomUUID(),
      value: this.addToDoInput.value,
      done: false,
    });
    setTodoList(todos);
    this.addToDoInput.value = "";
    renderToDos();
  };
}
