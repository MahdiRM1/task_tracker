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
    <div class="task_cart">
        <h3>عنوان:${task.title}</h3>
        <p>توضیحات:${task.description}</p>
        <p>وضعیت:${statusLabel(task.status)}</p>
        <p>اولویت:${priorityLabel(task.priority)}</p>
        <p>مهلت تحویل:${new Date(task.due_date).toLocaleDateString('fa-IR')}</p>
        <button onclick="openTaskForm(${task.id})">ویرایش</button>
        <button onclick="deleteTask(${task.id})">حذف</button>
    </div>
    `
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

function renderActivityLog(activity_log) {
    return `
    <div class="activity_log_cart">
        <h3>توسط:${activity_log.username}</h3>
        <p>نام فعالیت:${activity_log.task_title}</p>
        <p>عمل:${activity_log.action}</p>
        <p>مقدار قبلی:${statusLabel(activity_log.old_value)}</p>
        <p>مقدار جدید:${priorityLabel(activity_log.new_value)}</p>
    </div>
    `
}

function renderActivityLogList(activity_logs) {
    const container = document.getElementById('activity_log-container');
    container.innerHTML = `
        <fieldset>
            <legend>لاگ ها</legend>
            ${activity_logs.map(al => renderActivityLog(al)).join('')}
        </fieldset>
    `;
}