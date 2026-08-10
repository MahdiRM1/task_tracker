const API_BASE_URL = 'http://127.0.0.1:8000/api';

function getAccessToken() {
    return localStorage.getItem('access_token');
}

async function apiRequest(endpoint, method = "GET", body = null) {
    const headers = {'Content-Type': 'application/json'};
    const token = getAccessToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const options = {method, headers};
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(API_BASE_URL + endpoint, options);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(JSON.stringify(errorData));
    }

    if (response.status === 204) return null;
    return response.json();
}

function apiGet(endpoint) {
    return apiRequest(endpoint, 'GET');
}
function apiPost(endpoint, body) {
    return apiRequest(endpoint, 'POST', body);
}
function apiPatch(endpoint, body) {
    return apiRequest(endpoint, 'PATCH', body);
}
function apiDelete(endpoint) {
    return apiRequest(endpoint, 'DELETE');
}