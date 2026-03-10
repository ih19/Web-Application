const apiURL = 'http://localhost:3000/todos';
const todoList = document.getElementById('todo-list');
const newTodoForm = document.getElementById('new-todo-form');
const newTodoInput = document.getElementById('new-todo-input');

// Function to fetch and display todos
async function fetchTodos() {
  try {
    const response = await fetch(apiURL);
    const todos = await response.json();
    todoList.innerHTML = '';

    if (todos.length === 0) {
      todoList.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
      return;
    }

    todos.forEach(todo => addTodoToDOM(todo));
  } catch (error) {
    todoList.innerHTML = '<li class="empty-state">Could not connect to server. Make sure the backend is running.</li>';
    console.error('Error fetching todos:', error);
  }
}

// Function to add a single todo item to the DOM
function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${todo.completed ? 'completed' : ''}" 
          onclick="toggleTodo(${todo.id}, ${todo.completed})" 
          style="cursor:pointer; flex:1;"
          title="Click to toggle complete">
      ${todo.task}
    </span>
    <button onclick="deleteTodo(${todo.id})">Delete</button>
  `;
  todoList.appendChild(li);
}

// Function to handle new todo form submission (POST request)
newTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTask = newTodoInput.value.trim();
  if (!newTask) return;

  const newTodo = { task: newTask, completed: false };

  try {
    await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    newTodoInput.value = '';
    fetchTodos();
  } catch (error) {
    console.error('Error adding todo:', error);
  }
});

// Function to toggle a todo's completed state (PATCH request)
async function toggleTodo(id, currentState) {
  try {
    await fetch(`${apiURL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentState }),
    });
    fetchTodos();
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
}

// Function to delete a todo (DELETE request)
async function deleteTodo(id) {
  try {
    await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

// Initial fetch when the page loads
fetchTodos();
