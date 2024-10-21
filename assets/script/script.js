const input = document.getElementById('input')
const inputButton = document.getElementById('submit')
const clearButton = document.getElementById('clear')
//const strText = document.getElementById('text')

const addTasksList = () => {
    const listTasks = document.getElementById('tasks')
    const template = document.querySelector('.main__section_template');
    
    const item = template.content.cloneNode(true)  // Клонируем содержимое тега <template>
    item.querySelector('label').textContent = input.value;
    item.querySelector('.main__section_template-info').className += ' task_str';
    listTasks.append(item)

    input.value = '';
}


let tasks = [];
let setLocalStorage = () => {
    tasks.push(input.value);
    localStorage.setItem( "task", JSON.stringify(tasks))

    document.getElementById('text').style.display = 'none';
}


const addTask = () => {
    let inputValue = input.value;
    if (inputValue === '') {
        console.log(`поле не заполнено`) // подумать что написать
        return
    } 

    const tasks = JSON.parse(localStorage.getItem("task"))
    if(tasks === '') {
        tasks = [];
        setLocalStorage()
        addTasksList()
    } else {
        setLocalStorage()
        addTasksList()
    }
};

inputButton.addEventListener('click', addTask)

//очистка списка 
const clearTasks = () => {
    tasks = [];
    localStorage.clear("task");

    const taskLink = document.querySelector('.task_str');
    taskLink.remove()
};
clearButton.addEventListener('click', clearTasks)

//Когда задач нет, должно быть серое уведомление о том, что задачи отсутствуют, а кнопка «Очистить список» должна быть неактивна

//При добавлении задачи в список, каждая из них должна появляться в списке задач и напротив иметь неактивный чекбокс, а кнопка «Очистить список» должна быть активна

//Каждый чекбокс напротив задачи должен менять своё состояние при клике (говоря нам, что задача выполнена)