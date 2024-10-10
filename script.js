document.addEventListener('DOMContentLoaded',() =>{

let todoInput = document.getElementById("todo-input");
let addTaskButton = document.getElementById("add-task-btn");
let toDoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach((task) => renderTask(task));

addTaskButton.addEventListener("click", function () {
  const taskText = todoInput.value.trim(); // here trim is used for when user add a extra spaces in the task.

  if (taskText === "") return;

  const newTask = {
    id: Date.now(), // Date.now() returns the number of milliseconds elapsed since January 1, 1970, UTC.
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTask();
  renderTask(newTask)
  todoInput.value = ""; //clear input value
  // console.log(tasks);
});

function renderTask(task) {
  const Li = document.createElement('li');
  Li.setAttribute('data-id',task.id);
  if(task.completed){
    Li.classList.add('completed');
  }
  Li.innerHTML = `
  <span>${task.text}</span>
  <button>Delete</button>`;

  Li.addEventListener('click',(e)=>{
    if(e.target.tagName === 'Button') return;
    task.completed = !task.completed;
    Li.classList.toggle('completed');
    saveTask();
  });

  Li.querySelector('button').addEventListener('click',(e) => {
    e.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    Li.remove()
    saveTask();
  })

  toDoList.appendChild(Li);
}

function saveTask(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
} 

})
// localstorage has taken two value key and value. key can be of any type but value should be in string.

/* 

1. JSON.stringify():
This method converts a JavaScript object or array into a JSON string. This is useful when you want to store an object in a format that local storage can handle because localStorage can only store data as strings.( Object ---> String )

E.g - const user = { name: "John", age: 25 };
const jsonString = JSON.stringify(user);
console.log(jsonString); //    Output: {"name":"John","age":25}


2. JSON.parse(): 
This method takes a JSON string and converts it back into a JavaScript object. It’s used to retrieve data from local storage and turn it back into its original form. (String ---> Original data type)

E.g - const jsonString = '{"name":"John","age":25}';
const userObject = JSON.parse(jsonString);
console.log(userObject.name); // Output: John
console.log(userObject.age);  // Output: 25

How they are helping in Localstorage ?

Ans - Local storage only supports storing key-value pairs as strings. If you try to store an object directly, it won’t work as expected. JSON.stringify() helps convert objects or arrays into a string format, while JSON.parse() helps convert the stored string back into a usable object.
*/
