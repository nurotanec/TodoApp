import {getStorage, setStorage} from './serviceStorage.js';
import {createHeader, createForm, createTable,
  createRow} from './createElement.js';
import {auth} from './util.js';
import {formControl, tableControl} from './control.js';

export const renderList = (key, table) => {
  table.tbody.innerHTML = '';
  getStorage(key).forEach(entry => {
    table.tbody.append(createRow(entry, key, table));
  });
};

export const addToList = (key, name, table) => {
  const object = {
    name,
    'status': false,
  };
  setStorage(key, object);
  renderList(key, table);
};

export const enableButton = form =>
  form.firstButton.removeAttribute('disabled');
export const disableButton = form =>
  form.firstButton.setAttribute('disabled', '');


export const renderApp = () => {
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

  formControl(form, username, table);
  tableControl(table, username);

  renderList(username, table);
};
