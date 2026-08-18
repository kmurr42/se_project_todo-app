import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

let activePopup = null;

function handleEscClose(evt) {
  if (evt.key === "Escape" && activePopup) {
    closeModal(activePopup);
  }
}

const openModal = (modal) => modal.classList.add("popup_visible");
activePopup = modal;
modal.classList.add("popup_visible");
document.addEventListener("keydown", handleEscClose);

const closeModal = (modal) => modal.classList.remove("popup_visible");
modal.classList.remove("popup_visible");
document.removeEventListener("keydown", handleEscClose);
activePopup = null;

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

addTodoButton.addEventListener("click", () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id: uuidv4(), name, date };

  renderTodo(values);

  formValidator.resetValidation();
  closeModal(addTodoPopup);
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

initialTodos.forEach((item) => {
  const renderTodo = generateTodo(item);
  todosList.append(todo);
});
