export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
export const setStorage = (key, object) => {
  const objects = getStorage(key);
  localStorage.setItem(key, JSON.stringify(objects.concat(object)));
};

export const removeStorage = (key, index) => {
  const objects = getStorage(key);
  objects.splice(index - 1, 1);
  localStorage.setItem(key, JSON.stringify(objects));
};
