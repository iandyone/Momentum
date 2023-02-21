let todoState = JSON.parse(localStorage.getItem('todos')) || [];
const todosPlaceholder = document.querySelector('.todos__placeholder');
const todosStartButton = document.querySelector('.todos__start-button');
const todosBody = document.querySelector('.todos__body');

export function fetchTodos() {
    todoState = JSON.parse(localStorage.getItem('todos')) || [];

    if (todoState.length) {
        todosPlaceholder.classList.add('hidden');
        todosPlaceholder.style.display = 'none';
        todosBody.style.justifyContent = 'normal';
        document.querySelector('.todos__input').classList.remove('hidden');

        todoState.forEach(todo => {
            createTodo(todo.id, todo.text, todo.isDone);
        });
    }
}

export function showTodos() {
    document.querySelector('.settings__button').classList.remove('active');
    document.querySelector('.settings__menu').classList.remove('active');

    document.querySelector('.todos__button').classList.toggle('active');
    document.querySelector('.todos__menu').classList.toggle('active');
}

export function hidePlaceholder() {
    todosStartButton.classList.toggle('hidden');
    const todosInput = document.querySelector('.todos__input');
    todosInput.classList.remove('hidden');
    todosInput.focus();
}

export function addTodo(e) {
    const todoID = Date.now();
    const todoText = e.target.value;
    const todoStatus = false;

    todosPlaceholder.classList.add('hidden');
    todosPlaceholder.style.display = 'none';
    todosBody.style.justifyContent = 'normal';

    const todo = {
        id: todoID,
        text: todoText,
        isDone: todoStatus,
    };

    todoState.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoState));

    createTodo(todoID, todoText, todoStatus);
    e.target.value = '';
}

function createTodo(todoID, todoText, isDone) {
    const todoList = document.querySelector('.todos__list')
    todoList.classList.remove('hidden');

    const todoItem = document.createElement('LI');
    todoItem.classList.add('todo__item');
    todoItem.setAttribute('data-id', todoID);
    if (isDone) {
        todoItem.classList.add('compleated');
    }

    // Todo Status
    const todoStatus = document.createElement('DIV');
    todoStatus.classList.add('todo__status');
    todoStatus.addEventListener('click', (e) => setTodoStatus(e));
    todoItem.append(todoStatus);

    // Todo Text
    const todoTextItem = document.createElement('P');
    todoTextItem.classList.add('todo__text');
    todoTextItem.textContent = todoText;
    todoItem.append(todoTextItem);

    // Todo Delete
    const todoButton = document.createElement('DIV');
    todoButton.classList.add('todo__button');
    todoButton.addEventListener('click', () => deleteTodo(todoID));
    todoItem.append(todoButton);
    todoList.append(todoItem);
}

function deleteTodo(id) {
    const newTosoState = todoState.filter(todo => todo.id !== id);
    const todoList = document.querySelector('.todos__list').children;

    localStorage.setItem('todos', JSON.stringify(newTosoState));
    Array.from(todoList).forEach((item) => item.remove());

    if (!newTosoState.length) {
        resetTodos()
    }

    fetchTodos();
}

function resetTodos() {
    todosPlaceholder.classList.remove('hidden');
    todosStartButton.classList.remove('hidden');
    document.querySelector('.todos__input').classList.add('hidden');
    todosPlaceholder.style.display = 'flex';
    todosBody.style.justifyContent = 'center';
}

function setTodoStatus(event) {
    const todo = event.target.closest('.todo__item');
    const todoState = JSON.parse(localStorage.getItem('todos')) || [];
    const currentTodo = todoState.find((item) => item.id === +todo.dataset.id);

    todo.classList.toggle('compleated');
    currentTodo.isDone = (currentTodo.isDone) ? false : true;
    localStorage.setItem('todos', JSON.stringify(todoState));
}