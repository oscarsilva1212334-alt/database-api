const API_URL = '/api/v1/demo';

const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const list = document.getElementById('task-list');
const message = document.getElementById('message');
const filters = document.querySelectorAll('.filter');

let tasks = [];
let currentFilter = 'all';

function showError(text) {
  message.textContent = text;
  message.hidden = !text;
}

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error en la petición');
  return json.data;
}

async function loadTasks() {
  try {
    tasks = await request(API_URL);
    showError('');
    render();
  } catch (err) {
    showError('No se pudo conectar con la API: ' + err.message);
  }
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-text').textContent = `${done} de ${total} completadas`;
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';
}

function render() {
  updateProgress();
  list.innerHTML = '';

  const visible = tasks.filter((t) =>
    currentFilter === 'all' ? true : currentFilter === 'done' ? t.completed : !t.completed
  );

  if (!visible.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No hay actividades en esta vista.';
    list.appendChild(li);
    return;
  }

  visible.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' done' : '');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.addEventListener('change', () => updateTask(task._id, { completed: check.checked }));

    const body = document.createElement('div');
    body.className = 'task-body';
    const t = document.createElement('div');
    t.className = 'task-title';
    t.textContent = task.title;
    body.appendChild(t);
    if (task.description) {
      const d = document.createElement('div');
      d.className = 'task-desc';
      d.textContent = task.description;
      body.appendChild(d);
    }

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const edit = document.createElement('button');
    edit.className = 'icon-btn';
    edit.title = 'Editar';
    edit.textContent = '✎';
    edit.addEventListener('click', () => editTask(task));

    const del = document.createElement('button');
    del.className = 'icon-btn delete';
    del.title = 'Eliminar';
    del.textContent = '🗑';
    del.addEventListener('click', () => deleteTask(task._id));

    actions.append(edit, del);
    li.append(check, body, actions);
    list.appendChild(li);
  });
}

async function updateTask(id, changes) {
  try {
    await request(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(changes) });
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
}

async function editTask(task) {
  const title = prompt('Nuevo título:', task.title);
  if (title === null) return;
  const description = prompt('Nueva descripción:', task.description || '');
  if (description === null) return;
  updateTask(task._id, { title, description });
}

async function deleteTask(id) {
  if (!confirm('¿Eliminar esta actividad?')) return;
  try {
    await request(`${API_URL}/${id}`, { method: 'DELETE' });
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await request(API_URL, {
      method: 'POST',
      body: JSON.stringify({ title: titleInput.value, description: descInput.value }),
    });
    form.reset();
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
});

filters.forEach((btn) =>
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  })
);

loadTasks();
