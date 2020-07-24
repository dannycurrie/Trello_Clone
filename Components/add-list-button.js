import { createElement } from './utils.js';

export default (listsContainer, addNewList) => {
  const container = createElement('div', {
    parent: listsContainer,
    className: 'add-list-btn',
  });

  container.addEventListener('click', addNewList);

  createElement('span', {
    parent: container,
    textContent: 'Add another list',
    className: 'add-list-btn-label',
  });
};
