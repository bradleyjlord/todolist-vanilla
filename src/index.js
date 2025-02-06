document.addEventListener("DOMContentLoaded", loadTodos);
function addTodo() {
    let input = document.getElementById("todo-input");
    let task = input.value.trim();
    if (!task) return;
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text: task, done: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    loadTodos();
}
function loadTodos() {
    let list = document.getElementById("todo-list");
    list.innerHTML = "";
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
            
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.className = todo.done ? "done" : "";
        li.innerHTML = `
            <span onclick="toggleDone(${index})">${todo.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTodo(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
}
function toggleDone(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].done = !todos[index].done;
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
}

function editTodo(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let newText = prompt("Edit task:", todos[index].text);
    if (newText !== null) {
        todos[index].text = newText;
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    }
}
function deleteTodo(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
}
function clearAllTodos() {
    localStorage.removeItem("todos");
    loadTodos();
}