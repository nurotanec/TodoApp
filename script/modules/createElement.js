export const createHeader = () => {
  const header = document.createElement('h3');
  header.textContent = 'Todo App';
  return header;
};

export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  const inputLabel = document.createElement('label');
  inputLabel.classList.add('form-group', 'me-3', 'mb-0');

  const inputText = document.createElement('input');
  inputText.classList.add('form-control');
  inputText.type = 'text';
  inputText.placeholder = 'ввести задачу';
  inputLabel.append(inputText);

  const firstButton = document.createElement('button');
  firstButton.type = 'submit';
  firstButton.classList.add('btn', 'btn-primary', 'me-3');
  firstButton.textContent = 'Сохранить';
  firstButton.disabled = true;

  const secondButton = document.createElement('button');
  secondButton.type = 'reset';
  secondButton.classList.add('btn', 'btn-warning');
  secondButton.textContent = 'Очистить';

  form.append(inputLabel);
  form.append(firstButton);
  form.append(secondButton);
  form.firstButton = firstButton;

  return form;
};

export const createTable = () => {
  // table
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
    `);

  const tbody = document.createElement('tbody');
  table.tbody = tbody;

  table.append(thead, tbody);
  table.tbody = tbody;

  tableWrapper.append(table);

  return {
    tableWrapper,
    table,
  };
};

export const createRow = (task) => {
  const tr = document.createElement('tr');

  const tdId = document.createElement('td');
  tdId.textContent = document.querySelector('tbody').childElementCount + 1;

  const tdName = document.createElement('td');
  tdName.textContent = task.name;

  const tdStatus = document.createElement('td');

  // bonus: кнопка редактировать
  const tdButtons = document.createElement('td');
  const buttonDel = document.createElement('button');
  buttonDel.classList.add('btn', 'btn-danger');
  buttonDel.textContent = 'Удалить';
  const buttonEnd = document.createElement('button');
  buttonEnd.classList.add('btn', 'btn-success');
  buttonEnd.textContent = 'Завершить';
  tdButtons.append(buttonDel);
  tdButtons.append(' ');
  tdButtons.append(buttonEnd);

  if (task.status === true) {
    tr.classList.add('table-success');
    tdName.classList.add('text-decoration-line-through');
    tdStatus.textContent = 'Выполнена';
  } else {
    tr.classList.add('table-light');
    tdName.classList.add('task');
    tdStatus.textContent = 'В процессе';
  }

  tr.append(tdId, tdName, tdStatus, tdButtons);

  return tr;
};
