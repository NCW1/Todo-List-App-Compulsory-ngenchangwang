// Fetch todos from the API
fetch('https://jsonplaceholder.typicode.com/todos')
	// Process the response data
	.then(response => response.json())
	.then(data => {
		// Access DOM elements
		const todoList = document.getElementById('todo-list');
		const userFilter = document.getElementById('user-filter');
		const completedFilter = document.getElementById('completed-filter');

		// Get unique user IDs
		const userIds = [...new Set(data.map(todo => todo.userId))];

		// Populate user filter options
		userIds.forEach(userId => {
			const option = document.createElement('option');
			option.value = userId;
			option.textContent = `User ${userId}`;
			userFilter.appendChild(option);
		});

		// Render todos based on filters
		const renderTodos = () => {
			// Retrieve the selected user value and completed value from the filter elements
			const selectedUser = userFilter.value;
			const completedValue = completedFilter.value;

			// Clear todo list
			todoList.innerHTML = '';

			// Filter todos based on selected user and completed value
			const filteredTodos = data.filter(todo =>
				(selectedUser === '' || todo.userId === parseInt(selectedUser)) &&
				(completedValue === '' || todo.completed === (completedValue === 'true'))
			);

			// Render filtered todos
			filteredTodos.forEach(todo => {
				const tr = document.createElement('tr');
				const td = document.createElement('td');
				td.textContent = todo.title;

				if (todo.completed) {
					td.classList.add('completed');
				}

				tr.appendChild(td);
				todoList.appendChild(tr);
			});
		};

		// Event listeners for filters
		userFilter.addEventListener('change', renderTodos);
		completedFilter.addEventListener('change', renderTodos);

		// Initial rendering of todos
		renderTodos();
	});