export const auth = () => {
  const username = prompt('Введите имя пользователя');
  return username.length > 0 ? username : auth();
};

export const whichID = target =>
  parseInt(target.closest('tr').children[0].textContent);
