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
            createTodo(todo.id, todo.text);
        });
    }
}

export function showTodos() {
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

    todosPlaceholder.classList.add('hidden');
    todosPlaceholder.style.display = 'none';
    todosBody.style.justifyContent = 'normal';

    const todo = {
        id: todoID,
        text: todoText,
        isDone: false,
    };

    todoState.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoState));

    createTodo(todoID, todoText);
    e.target.value = '';
}



function createTodo(todoID, todoText) {
    const todoList = document.querySelector('.todos__list')
    todoList.classList.remove('hidden');

    const todoElement = document.createElement('LI');
    const todoContainer = document.createElement('DIV');

    todoContainer.setAttribute('data-id', todoID);
    todoContainer.addEventListener('click', () => deleteTodo(todoID));

    todoContainer.classList.add('todo__item');
    todoElement.append(todoContainer);

    const todoCheckbox = document.createElement('INPUT');
    todoCheckbox.classList.add('todo__checkbox')
    todoCheckbox.setAttribute('type', 'checkbox');
    todoContainer.append(todoCheckbox);

    const todo = document.createElement('P');
    todo.classList.add('todo__text');
    todo.textContent = todoText;
    todoContainer.append(todo);

    todoList.append(todoElement);
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