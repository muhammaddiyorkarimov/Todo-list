const formCreate = document.getElementById("form-create");
const inputCreate = document.getElementById("input-cerate");
const messageCreate = document.getElementById("message-create");
const listGroupTodo = document.getElementById("list-group-todo");
const formEdit = document.getElementById("form-edit");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");

// time
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let editTodoItem


let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];

if (todos.length) showTodos()

// showMessage
function showMessage (where, message) {
	document.getElementById(`${where}`).textContent = message;

	setTimeout(() => {
		document.getElementById(`${where}`).textContent = "";
	}, 2500)
}

// setTodos
function setTodos () {
	localStorage.setItem("list", JSON.stringify(todos));
}

// time
function getTime () {
	const now = new Date();
	
	const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
	const month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
	const year = now.getFullYear();
	const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
	const minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
	const second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	const month_title = now.getMonth()

	fullDay.textContent = `${date}, ${months[month_title]} ${year}`
	hourEl.textContent = hour
	minuteEl.textContent = minute
	secondEl.textContent = second

	return `${date}.${month}.${year}, ${hour}:${minute}`;
}

setInterval(getTime, 1000)

// showTodos
function showTodos () {

	listGroupTodo.innerHTML = "";

	todos.forEach((item, i) => {
		listGroupTodo.innerHTML += `
			<li ondblclick="completedTodo(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'completed' : ''} ">
				${item.text}
				<div class="todo-icons">
					<span class="opacity-50 me-3">${item.time}</span>
					<img onclick="editTodo(${i})" src="./img/edit.svg" alt="edit icon" width="25">
					<img onclick="deleteTodo(${i})" src="./img/delete.svg" alt="delete icon" width="25">
				</div>
			</li>
`
	})
}


formCreate.addEventListener('submit', (e) => {
	e.preventDefault();

	const todoText = formCreate["input-create"].value.trim();
	formCreate.reset();
	
	if (todoText.length) {
		todos.push({text: todoText, time: getTime(), completed: false});
		setTodos()
		showTodos();
	} else {
		showMessage('message-create', "Please, enter some text...");
	}
})

function deleteTodo (id) {
	const deleteTodos = todos.filter((item, i) => {
		return id != i
	})
	
	todos = deleteTodos
	showTodos()
	setTodos()
}

function completedTodo (id) {
	const completedTodos = todos.map((item, i) => {
		if (id == i) return { ...item, completed: item.completed == true ? false : true }
		else return { ...item }
	})

	todos = completedTodos
	showTodos()
	setTodos()
}

formEdit.addEventListener('submit', (e) => {
	e.preventDefault();

	const todoText = formEdit["input-edit"].value.trim();
	formEdit.reset();
	
	if (todoText.length) {
		todos.replace(editTodoItem, {text: todoText, time: getTime(), completed: false});
		setTodos()
		showTodos();
		close()
	} else {
		showMessage('message-edit', "Please, enter some text...");
	}
})

overlay.addEventListener('click', close)
closeBtn.addEventListener('click', close)

function editTodo (id) {
	open()
}

function open () {
	modal.classList.remove('hidden')
	overlay.classList.remove('hidden')

}

function close () {
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
}