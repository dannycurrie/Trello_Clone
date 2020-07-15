export const getCardElement = (id) => document.querySelector(`#${id}`);
export const getListElement = (id) => document.querySelector(`ul#${id}`);

export const elementExists = (id) => document.querySelector(`#${id}`) !== null;

export const createElement = (type, options = {}) => {
  const element = document.createElement(type);

  for (let key of Object.keys(options)) {
    if (key == 'parent') options.parent.appendChild(element);
    else element[key] = options[key];
  }

  return element;
};

export const clearElementChildren = (element) => (element.textContent = '');
