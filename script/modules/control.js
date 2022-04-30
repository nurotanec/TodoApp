import {getStorage} from './serviceStorage.js';
import {enableButton, disableButton, addToList, renderList} from './render.js';
import {removeStorage} from './serviceStorage.js';
import {whichID} from './util.js';

const endTask = (key, i) => {
  const list = getStorage(key);
  list[i - 1].status = !(list[i - 1].status);
  localStorage.setItem(key, JSON.stringify(list));
};

export const formControl = (form, username, table) => {
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
};

export const tableControl = (table, username) => {
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
