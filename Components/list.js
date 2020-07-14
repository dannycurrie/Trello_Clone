import { elementExists, createElement } from './utils.js';

const getListId = (id) => `list-${id.split('list-')[1]}`;

const addCard = (addToModel) => (e) =>
  addToModel({
    listId: getListId(e.target.id),
  });

const addBtn = (list, container, addCardToModel) => {
  const addBtn = createElement('div', {
    className: 'add-btn',
    textContent: 'Add another card',
    parent: container,
    id: `addCard - ${list.id} `,
  });
  addBtn.addEventListener('click', addCard(addCardToModel));
  createElement('span', {
    className: 'icon',
    textContent: '+',
    parent: addBtn,
  });
  const createBtn = createElement('div', {
    className: 'create-btn',
    parent: container,
  });
  createElement('span', {
    className: 'icon',
    textContent: '+',
    parent: createBtn,
  });
};

export default (listsContainer, addCardToModel, updateCard) => (list) => {
  if (elementExists(list.id)) return;

  const container = createElement('div', {
    className: 'list-container',
    id: list.id,
    parent: listsContainer,
  });
  // header
  const listHeader = createElement('div', {
    className: 'list-header',
    parent: container,
  });
  createElement('div', {
    className: 'list-title',
    textContent: list.name,
    parent: listHeader,
  });
  createElement('div', {
    className: 'list-menu',
    textContent: '...',
    parent: listHeader,
  });

  // list
  let ul;
  const dropHandler = (ev) => {
    ev.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    updateCard(cardId, { listId: list.id });
  };
  ul = createElement('ul', {
    id: list.id,
    parent: container,
    ondrop: dropHandler,
    ondragover: (e) => e.preventDefault(),
  });

  // add card button
  const addContainer = createElement('div', {
    className: 'add-container',
    parent: container,
  });
  addBtn(list, addContainer, addCardToModel);
};
