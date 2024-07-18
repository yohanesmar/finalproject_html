
  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);
}
  function filterProjects(id) {
    var cards = document.querySelectorAll('.col-md-5');
    var container = document.getElementById('portofolio-container');

    cards.forEach(function (card) {
        card.style.display = 'none';
    });

    var visibleCards = [];
    cards.forEach(function (card) {
        if (id === 'all' || card.getAttribute('data-id') == id) {
            card.style.display = 'block';
            visibleCards.push(card);
        }
    });

    visibleCards.forEach(function (card) {
        container.appendChild(card);
    });
}

$(document).ready(function () {

  $('.carousel').carousel({
      interval: 500
  });

  function deleteTodo(index) {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
  }

  function toggleDone(index) {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos[index] = {
          text: todos[index].text,
          done: !todos[index].done
      };
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
  }

  function renderTodos() {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      const todoList = document.getElementById('todoList');
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
          const todoItem = document.createElement('li');
          todoItem.className = 'list-group-item todo-item';
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = todo.done || false;
          checkbox.className = 'checkbox';
          checkbox.addEventListener('change', () => toggleDone(index));
          todoItem.appendChild(checkbox);
          const todoText = document.createElement('span');
          todoText.className = 'todo-text';
          todoText.textContent = todo.text;
          if (todo.done) {
              todoText.style.textDecoration = 'line-through';
          } else {
              todoText.style.textDecoration = 'none';
          }
          todoItem.appendChild(todoText);
          const deleteButton = document.createElement('button');
          deleteButton.className = 'delete-btn btn btn-danger btn-sm';
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteTodo(index));
          todoItem.appendChild(deleteButton);
          todoList.appendChild(todoItem);
      });
  }

  document.getElementById('todoForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const todoInput = document.getElementById('todoInput');
      const todoText = todoInput.value.trim();

      if (todoText) {
          let todos = JSON.parse(localStorage.getItem('todos')) || [];
          todos.push({ text: todoText, done: false });
          localStorage.setItem('todos', JSON.stringify(todos));
          todoInput.value = '';
          renderTodos();
      }
  });

  document.addEventListener('DOMContentLoaded', function () {
      renderTodos();
  });
});
