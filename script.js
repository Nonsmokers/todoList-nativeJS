let elements = [];
let ctrlBtn = false;
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let step = 0;

//localStorage
let todos;
function toLocal() {
    todos = todoList.innerHTML
    localStorage.setItem('todos', todos);
}
if (localStorage.getItem('todos')) {
    todoList.innerHTML = localStorage.getItem('todos');
}

//create structure of task
function createTask(task) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';

    const delTask = document.createElement('input');
    delTask.type = 'button';
    delTask.dataset.btn = 'btn';
    delTask.value = 'delete';
    delTask.className = 'delete-btn-task';

    const label = document.createElement('label');
    label.className = 'label-task'
    label.innerText = task;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(delTask);
    toLocal()
    return listItem;
}

function addTask(event) {
    event.preventDefault();
    let task = addInput.value;
    if (task === '') {
        return alert('Пустая строка, нужно ввести значение');
    }
    const todoItem = createTask(task);
    todoList.appendChild(todoItem);
    addInput.value= '';
    toLocal()
}
//delete task from cklick
todoList.addEventListener('click', event => {
    const btnType = event.target.dataset.btn;
    item = event.target.closest('li');

    if (btnType === 'btn') {
        item.remove()
        this.style.backgroundColor = 'black';
        toLocal()
    }
})

//complete task
function completeTask() {
    const check = document.querySelectorAll('.checkbox');
    check.forEach(el => {
        if (el.checked === true) {
            el.closest('.todo-item').classList.add('complete')
        } else {
            el.closest('.todo-item').classList.remove('complete')
        }
        toLocal()
    });
}

//select task from click (add style)
const taskSelected = (event) => {
    let li = event.target.closest('li')
    if (ctrlBtn) {
        li.classList.add('selected');
        elements.push(li);
    } else {
        elements = [];
        document.querySelectorAll('li').forEach(li => li.classList.remove('selected'))
        elements.push(li);
        li.classList.add('selected');
        toLocal()
    }
}
//overlays promt you what you can press ctrl and del
const overlay1= document.querySelector('.overlay-prew')
const overlay2= document.querySelector('.overlay')

//press ctrl and add elements in arr
const keydownHendler = (event) => {
    if (event.keyCode === 17) {
        ctrlBtn = true;
        overlay1.style.display = "none";
        overlay2.style.display = "flex";
    }
}
//press del and del selected elements from arr
const keyupHendler = (event) => {
    if (event.keyCode === 46) {
        elements.forEach(elem => elem.remove());
    } else if (event.keyCode === 17) {
        ctrlBtn = false;
        overlay1.style.display = "flex";
        overlay2.style.display = "none";
    }
}
//modal window
const modal = $.modal({
    tittle: 'Welcome',
    closable: true,
    content: `
    <p>Login:</p>
    <input autofocus type="text" class="todo-input"  aria-label="Enter login" placeholder="Write login here..." >
    <p>Password:</p>
    <input autofocus type="text" class="todo-input"  aria-label="Enter password" placeholder="Write password here..." >
    `,
    width: '400px'
});
setTimeout(() => {
    modal.open()
}, 500);

function main() {
    todoList.addEventListener('click', completeTask);
    todoForm.addEventListener('submit', addTask);
    todoList.addEventListener('click', taskSelected);
    document.addEventListener('keydown', keydownHendler);
    document.addEventListener('keyup', keyupHendler);
}
main();