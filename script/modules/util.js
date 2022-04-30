export const auth = () => {
  const username = prompt('Введите имя пользователя');
  if (username.trim()) {
    return username.trim();
  } else {
    return auth();
  }
};

export const whichID = target =>
  parseInt(target.closest('tr').children[0].textContent);
