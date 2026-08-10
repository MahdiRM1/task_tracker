let currentPage = 1;

async function loadTasks() {
    const status = document.getElementById('filter-status').value;
    const priority = document.getElementById('filter-priority').value;
    const search = document.getElementById('search-input').value;

    const params = new URLSearchParams();
    if (status != "ANY") params.append('status', status);
    if (priority != "ANY") params.append('priority', priority);
    if (search) params.append('search', search);
    params.append('page', currentPage);
    
    const queryString = params.toString();
    const result = await apiGet(`/tasks/?${queryString}`);
    await renderTaskList(result.results);

    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('prev-page-btn').disabled = result.previous === null;
    document.getElementById('next-page-btn').disabled = result.next === null;
}

async function edit_filter() {
    currentPage = 1;
    await loadTasks();
}

async function openTaskForm(task_id = null) {
    const formContainer = document.getElementById('task-form-container');
    formContainer.style.display = 'block';
}

async function hideTaskForm() {
    const formContainer = document.getElementById('task-form-container');
    formContainer.style.display = 'none';
}

async function saveTask() {
    const taskId = document.getElementById("task-id").value;
    
    if (document.getElementById('task-title').value.trim() === '') {
        document.getElementById('task-form-error').textContent = 'عنوان تسک نمی‌تواند خالی باشد.';
        return;
    }

    if (document.getElementById('task-due-date').value.trim() === '') {
        document.getElementById('task-form-error').textContent = 'تاریخ سررسید نمی‌تواند خالی باشد.';
        return;
    }

    const data = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        status: document.getElementById('task-status').value,
        priority: Number(document.getElementById('task-priority').value),
        due_date: document.getElementById('task-due-date').value
    };

    if (taskId) await apiPatch(`/tasks/${taskId}/`, data);
    else await apiPost('/tasks/', data);

    document.getElementById('task-form-error').textContent = '';
    hideTaskForm();
    loadTasks();
}

loadTasks();

document.getElementById('next-page-btn').addEventListener('click', () => {
    currentPage++;
    loadTasks();
});

document.getElementById('prev-page-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTasks();
    }
});