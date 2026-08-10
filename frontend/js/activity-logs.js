let currentPage = 1;

async function loadActivityLogs() {
    const endpoint = `/activity_log/?page=${currentPage}`;

    const result = await apiGet(endpoint);
    await renderActivityLogList(result.results);

    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('prev-page-btn').disabled = result.previous === null;
    document.getElementById('next-page-btn').disabled = result.next === null;
}

loadActivityLogs();

document.getElementById('next-page-btn').addEventListener('click', () => {
    currentPage++;
    loadActivityLogs();
});

document.getElementById('prev-page-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadActivityLogs();
    }
});