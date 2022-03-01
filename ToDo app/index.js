let todos = [];
let idValue = 0;


const input = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const todoList = document.querySelector(".todos");

input.addEventListener("keyup", (e) => {
    e.preventDefault()

    if(e.keyCode === 13 && input.value !== ""){
        createTodo()
    }
})

addBtn.addEventListener("click", createTodo);




function createTodo() {
    todos = [...todos, {
        title: input.value,
        id: idValue,
        isCompleted: false
    }]

    input.value = ""
    loadTodos()
}

function loadTodos() {

    const HTML = todos.map(todo => {
        return ` 
        <li>
            <div class="todo">
                <span class="todo-title ${todo.isCompleted ? "completed" : ""}">${todo.title}</span>
                <div class="icons">
                    <i class="fas fa-trash trash" id="${todo.id}"></i>
                    <i class="fas fa-check check" id="${todo.id}"></i>
                </div>
            </div>
        </li>`
    }).join("")

    
    idValue ++;
    todoList.innerHTML = HTML
    const trash = todoList.querySelectorAll(".trash");
    const check = todoList.querySelectorAll(".check");
    trash.forEach(btn => btn.addEventListener("click", deleteTodo));
    check.forEach(btn => btn.addEventListener("click", completeTodo))

}

function deleteTodo() {

    const deleteEl = todos.find(todo => todo.id == this.id);
    const deleteIn = todos.indexOf(deleteEl);
    todos.splice(deleteIn, 1);
    loadTodos()
}

function completeTodo() {
    const completedEl = todos.find(todo => todo.id == this.id);
    completedEl.isCompleted = !completedEl.isCompleted;

    loadTodos()
}