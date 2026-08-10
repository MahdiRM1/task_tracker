function priorityLabel(priority) {
    if (priority === 1) return 'پایین';
    if (priority === 2) return 'متوسط';
    if (priority === 3) return 'بالا';
    return priority;
}

function statusLabel(status) {
    if (status === 'TODO') return 'در دست انجام';
    if (status === 'COMPLETED') return 'تکمیل شده';
    return status;
}

function renderTaskCard(task) {
    return `
        <div class="task-item" onclick="openTask(${task.id})">
            <span class="task-title">${task.title}</span>
            <span class="task-status">
                ${statusLabel(task.status)}
            </span>
            <span class="task-priority">
                ${priorityLabel(task.priority)}
            </span>
        </div>
    `;
}

function openTask(taskId) {
    window.location.href = `task-detail.html?id=${taskId}`;
}

function renderTaskList(tasks) {
    const container = document.getElementById('task-list-container');

    container.innerHTML = `
        <fieldset>
            <legend>فعالیت‌ها</legend>
            ${tasks.map(task => renderTaskCard(task)).join('')}
        </fieldset>
    `;
}

function renderActivityLog(log) {
    return `
    <div class="activity_log_card">
        <h3>نام فعالیت:${log.task_title}</h3>
        <p>عمل:${log.action}</p>
        <p>مقدار قبلی:${log.old_value}</p>
        <p>مقدار جدید:${log.new_value}</p>
    </div>
    `
}

function renderActivityLogList(logs) {
    const container = document.getElementById('activity_log-container');
    container.innerHTML = `
        <fieldset>
            <legend>لاگ ها</legend>
            ${logs.map(log => renderActivityLog(log)).join('')}
        </fieldset>
    `;
}

function showSearch() {
    const search = document.getElementById('search-container');
    search.style.display = 'block';
}

function hideSearch() {
    const search = document.getElementById('search-container');
    search.style.display = 'none';
}