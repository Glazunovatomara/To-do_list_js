const input = document.getElementById('input')
const inputButton = document.getElementById('submit')
const clearButton = document.getElementById('clear')

let tasks = [];
const listTasks = document.getElementById('tasks')
const template = document.querySelector('.template');

let div = document.createElement('div');
div.className = 'task_str';
listTasks.prepend(div)

const TasksList = () => {
    tasks = JSON.parse(localStorage.getItem("task"));

    if(tasks === null) {
        tasks = [];
    }
    
    if (tasks.length >= 1) {
        for(let task of tasks) {

            const item = template.content.cloneNode(true);
            item.querySelector('label').textContent = task;
            div.append(item)

            document.getElementById('text').style.display = 'none';

            clearButton.disabled = false;

            clearButton.classList.remove('btn-disabled');
        }
    } 
}
TasksList()

const addTasksList = () => {
    const item = template.content.cloneNode(true)  // Клонируем содержимое тега <template>
    item.querySelector('label').textContent = input.value;
    div.append(item)
}

let setLocalStorage = () => {
    tasks.push(input.value);

    localStorage.setItem( "task", JSON.stringify(tasks))
    document.getElementById('text').style.display = 'none';
}


const addTask = () => {
    let inputValue = input.value;
    if (inputValue === '') {
        return
    } 
    
    if(tasks === null) {
        tasks = [];
        setLocalStorage()
        addTasksList()
        input.value = '';
        clearButton.disabled = false;
        clearButton.classList.remove('btn-disabled');
    } else {
        setLocalStorage()
        addTasksList()
        input.value = '';
        clearButton.disabled = false;
        clearButton.classList.remove('btn-disabled');
    }
};
inputButton.addEventListener('click', addTask);

//очистка списка

const clearTasks = () => {
    tasks = [];
    localStorage.clear("task");

    const taskLink = document.querySelector('.task_str');

    taskLink.remove()

    document.getElementById('text').style.display = '';
    clearButton.disabled = true;
    clearButton.className += " btn-disabled";
    location.reload()
}

clearButton.addEventListener('click', clearTasks);

//изменение checkbox и текста задачи
listTasks.addEventListener('click', function(event) {
    if(event.target.classList.contains('template-info')) {
        let checkbox = event.target.querySelector('.checkbox');
        checkbox.checked = !checkbox.checked;
        
        event.target.querySelector('.label-checkbox').classList.toggle('active');
    }
})