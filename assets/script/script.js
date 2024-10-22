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

//Когда задач нет, должно быть серое уведомление о том, что задачи отсутствуют, а кнопка «Очистить список» должна быть неактивна

//При добавлении задачи в список, каждая из них должна появляться в списке задач и напротив иметь неактивный чекбокс, а кнопка «Очистить список» должна быть активна

//+Каждый чекбокс напротив задачи должен менять своё состояние при клике - говоря нам, что задача выполнена