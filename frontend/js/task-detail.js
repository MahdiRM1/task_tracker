const params = new URLSearchParams(window.location.search);
let currentTask = null;
const taskId = params.get('id');

async function loadTask() {
    currentTask = await apiGet(`/tasks/${taskId}/`);

    document.getElementById('task-title').textContent = currentTask.title;
    document.getElementById('task-description').textContent = currentTask.description;
    document.getElementById('task-status').textContent = statusLabel(currentTask.status);
    document.getElementById('task-priority').textContent = priorityLabel(currentTask.priority);
    document.getElementById('task-due-date').textContent = currentTask.due_date;

}

async function deleteTask() {
    await apiDelete(`/tasks/${taskId}/`)
    window.location.href = 'index.html';
}

function showEditForm() {
    document.getElementById('task-detail').style.display = 'none';
    document.getElementById('edit-task-form').style.display = 'block';

    document.getElementById('edit-title').value = currentTask.title;
    document.getElementById('edit-description').value = currentTask.description;
    document.getElementById('edit-status').value = currentTask.status;
    document.getElementById('edit-priority').value = currentTask.priority;
    document.getElementById('edit-due-date').value = currentTask.due_date.slice(0, 16);
}

function cancelEdit(){
    document.getElementById('task-detail').style.display = 'block';
    document.getElementById('edit-task-form').style.display = 'none';
    document.getElementById('edit-error').textContent = '';
}

async function saveEditTask() {
    const data = {
        title: document.getElementById('edit-title').value.trim(),
        description: document.getElementById('edit-description').value.trim(),
        status: document.getElementById('edit-status').value,
        priority: Number(document.getElementById('edit-priority').value),
        due_date: document.getElementById('edit-due-date').value
    };

    if (!data.title) {
        document.getElementById('edit-error').textContent = 'عنوان نمی‌تواند خالی باشد.';
        return;
    }

    try {
        await apiPatch(`/tasks/${taskId}/`, data);
        await loadTask();
        cancelEdit();
    } catch (error) {
        document.getElementById('edit-error').textContent = error.message;
    }
}

loadTask();