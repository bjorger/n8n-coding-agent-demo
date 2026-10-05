import './styles.css';

const storageKey = 'launchpad.tasks';
const initialTasks = [
  { id: '1', title: 'Sketch the landing page', done: true },
  { id: '2', title: 'Build a working task list', done: true },
  { id: '3', title: 'Try a change with the coding agent', done: false },
  { id: '4', title: 'Ship a tiny improvement', done: false },
];

let tasks = initialTasks;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (Array.isArray(saved)) tasks = saved;
} catch {
  // Start with the sample tasks if saved data cannot be read.
}

let filter = 'all';
const list = document.querySelector('#tasks');
const template = document.querySelector('#task-template');
const form = document.querySelector('#add-task');
const titleInput = document.querySelector('#task-title');
const filterButtons = document.querySelectorAll('[data-filter]');
const announcement = document.querySelector('#announcement');

function saveAndRender(message) {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  render();
  announcement.textContent = message;
}

function render() {
  const completed = tasks.filter((task) => task.done).length;
  const percent = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
  document.querySelector('#completed-count').textContent = completed;
  document.querySelector('#remaining-count').textContent = `${tasks.length - completed} left to do`;
  document.querySelector('#progress-fill').style.width = `${percent}%`;
  document.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', percent);
  filterButtons.forEach((button) => button.setAttribute('aria-pressed', button.dataset.filter === filter));

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'open') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });
  list.replaceChildren();
  document.querySelector('#empty-state').hidden = visibleTasks.length !== 0;

  for (const task of visibleTasks) {
    const row = template.content.firstElementChild.cloneNode(true);
    const checkbox = row.querySelector('input');
    const deleteButton = row.querySelector('button');
    row.classList.toggle('is-done', task.done);
    row.querySelector('.task-title').textContent = task.title;
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      saveAndRender(`${task.title}: ${task.done ? 'done' : 'to do'}`);
    });
    deleteButton.setAttribute('aria-label', `Delete ${task.title}`);
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveAndRender(`Deleted ${task.title}`);
    });
    list.append(row);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  tasks.push({ id: crypto.randomUUID(), title, done: false });
  filter = 'all';
  form.reset();
  saveAndRender(`Added ${title}`);
  titleInput.focus();
});

filterButtons.forEach((button) => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  render();
}));

render();
