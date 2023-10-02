const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');


let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', showAllTodos);

//get random unique id
function getRandomId() {
    return Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 1000);
}

function addToDo(task_input) {
    let task = {
        id: getRandomId(),
        task: task_input.value,
        completed: false
    }
    todos.push(task);
}

task_input.addEventListener('keyup', (e) => {
    if (e.key === "Enter" && task_input.value.length > 0) {
        addToDo(task_input);
        saveToLocalStorage();
        task_input.value = '';
        showAllTodos();
        Editbtn();
        add_btn.removeEventListener('click', Editbtn)
    }
});

add_btn.addEventListener('click', () => {
    if (task_input.value === '') {
        showAlertMessage('Please enter a task', 'error');
    } else {
        addToDo(task_input);
        saveToLocalStorage();
        showAllTodos();
        task_input.value = '';
        showAlertMessage('Task added successfully', 'success');
    }
});


delete_all_btn.addEventListener('click', clearAllTodos);

//show all todos
function showAllTodos() {
    todos_list.innerHTML = '';
    todos.forEach((todo) => {
        todos_list.innerHTML += `
                <li class="todo-item" data-id="${todo.id}">
                <div class="todo-checkbox p-1 mt-2 mx-3">
                        <input type="checkbox" class="checkbox border-black" id="checkbox-${todo.id}" />
                    </div>
                    <p class="task-body text-white font-bold">
                        ${todo.task}
                    </p>
                    <div class="todo-actions">
                        
                        <button class="btn glass" onclick="editTodo('${todo.id}')">
                            <i class="bx bx-edit-alt bx-sm text-white"></i>    
                        </button>
                        <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                            <i class="bx bx-trash bx-sm text-black"></i>
                        </button>
                    </div>
                </li>
            `;

    });
}

//save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
    let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove('hide');
    alert_message.classList.add('show');
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 1000);
}

//delete todo
function deleteTodo(stringId) {
    let id = parseInt(stringId);
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    showAlertMessage('Todo deleted successfully', 'success');
    showAllTodos();
}

//edit todo
function editTodo(edit_task) {
    let edit = parseInt(edit_task);
    let todo = todos.find(todo => todo.id === edit);
    task_input.value = todo.task;
    todos = todos.filter(todo => todo.id !== edit);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    saveToLocalStorage();
    add_btn.addEventListener('click', Editbtn);
}

function Editbtn() {
    add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
    showAlertMessage('Todo updated successfully', 'success');
    add_btn.removeEventListener('click', Editbtn)
}
//clear all todos
function clearAllTodos() {
    if (todos.length > 0) {
        todos = [];
        saveToLocalStorage();
        showAlertMessage('All todos cleared successfully', 'success');
        showAllTodos();
    } else {
        showAlertMessage('Please Enter a Task', 'error');
    }
}



// Dark mode