async function loadTasks() {
    const status = document.getElementById('filter-status').value;
    const priority = document.getElementById('filter-priority').value;
    const search = document.getElementById('search-input').value;

    const params = new URLSearchParams();
    if (status != "ANY") params.append('status', status);
    if (priority != "ANY") params.append('priority', priority);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    const endpoint = '/tasks/' + (queryString ? `?${queryString}` : '');

    const result = await apiGet(endpoint);
    await renderTaskList(result.results);
}

async function openTaskForm(task_id = null) {
    const formContainer = document.getElementById('task-form-container');
    const statusWraper = document.getElementById('status-field-wrapper');

    if (task_id){
        const task = await apiGet(`/tasks/${task_id}/`);
        
        document.getElementById("task-id").value = task.id;
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-description").value = task.description;
        document.getElementById("task-priority").value = task.priority;
        document.getElementById("task-status").value = task.status;
        document.getElementById('task-due-date').value = task.due_date.slice(0, 16);

        statusWraper.style.display = 'block';
    }else{
        document.getElementById("task-id").value = '';
        document.getElementById("task-title").value = '';
        document.getElementById("task-description").value = '';
        document.getElementById("task-priority").value = '2';
        document.getElementById("task-due-date").value = '';

        statusWraper.style.display = 'block';
    }
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

    if (document.getElementById('task-due-date') === null) {
        document.getElementById('task-form-error').textContent = 'تاریخ سررسید نمی‌تواند خالی باشد.';
        return;
    }

    const data = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        priority: Number(document.getElementById('task-priority').value),
        due_date: document.getElementById('task-due-date').value
    };

    if (taskId) await apiPatch(`/tasks/${taskId}/`, data);
    else await apiPost('/tasks/', data);

    document.getElementById('task-form-error').textContent = '';
    hideTaskForm();
    loadTasks();
}

async function deleteTask(taskId) {
    await apiDelete(`/tasks/${taskId}/`)
    loadTasks();
}

async function loadActivityLogs() {
    const endpoint = '/activity_log/';

    const result = await apiGet(endpoint);
    await renderActivityLogList(result.results);
}

loadTasks();
loadActivityLogs();