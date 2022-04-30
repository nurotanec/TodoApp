'use strict';

{
  const randomID = () => Math.random().toString().substring(2, 10);
  randomID();
}

{
  // authorization
  const auth = () => {
    const username = prompt('Введите имя пользователя');
    return username.length > 0 ? username : auth();
  };

  const whichID = target =>
    parseInt(target.closest('tr').children[0].textContent);

  // storage
  const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
  const setStorage = (key, object) => {
    const objects = getStorage(key);
    localStorage.setItem(key, JSON.stringify(objects.concat(object)));
  };

  const removeStorage = (key, index) => {
    const objects = getStorage(key);
    objects.splice(index - 1, 1);
    localStorage.setItem(key, JSON.stringify(objects));
  };

  // create elements
  const createHeader = () => {
    const header = document.createElement('h3');
    header.textContent = 'Todo App';
    return header;
  };

  const createForm = () => {
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

  const createTable = () => {
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

  const createRow = (task) => {
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

  const endTask = (key, i) => {
    const list = getStorage(key);
    list[i - 1].status = !(list[i - 1].status);
    localStorage.setItem(key, JSON.stringify(list));
  };

  const renderList = (key, table) => {
    table.tbody.innerHTML = '';
    getStorage(key).forEach(entry => {
      table.tbody.append(createRow(entry, key, table));
    });
  };

  const addToList = (key, name, table) => {
    const object = {
      name,
      'status': false,
    };
    setStorage(key, object);
    renderList(key, table);
  };

  const enableButton = form => form.firstButton.removeAttribute('disabled');
  const disableButton = form => form.firstButton.setAttribute('disabled', '');

  const init = () => {
    // container
    const container = document.querySelector('.app-container');
    container.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
        'justify-content-center', 'flex-column');

    const header = createHeader();
    const form = createForm();
    const {tableWrapper, table} = createTable();

    container.append(header);
    container.append(form);
    container.append(tableWrapper);

    const username = auth();

    renderList(username, table);

    form.addEventListener('keyup', e => {
      if (e.target.value) {
        enableButton(form);
      } else {
        disableButton(form);
      }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const item = e.target.querySelector('input').value;
      if (item.trim()) {
        addToList(username, item, table);
      }
      e.target.querySelector('input').value = '';
    });

    form.addEventListener('reset', e => {
      e.preventDefault();
      form.firstButton.setAttribute('disabled', '');
      document.querySelector('input').value = '';
    });

    table.tbody.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.btn-danger')) {
        removeStorage(username, parseInt(whichID(target)));
        renderList(username, table);
      } else if (target.closest('.btn-success')) {
        endTask(username, parseInt(whichID(target)));
        renderList(username, table);
      }
    });
  };

  window.toDoApp = init;
}
