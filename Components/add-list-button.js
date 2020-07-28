import { createElement, clearElementChildren } from './utils.js';

const prompt = (container) =>
  createElement('span', {
    parent: container,
    textContent: 'Add another list',
    className: 'add-list-btn-label',
  });

const newListInput = (container, addNewList, cancel) => {
  const inputContainer = createElement('div', {
    parent: container,
    className: 'new-list-input-container',
  });
  const input = createElement('input', {
    parent: inputContainer,
    className: 'new-list-input',
    placeholder: 'Enter list title...',
  });
  input.focus();
  input.addEventListener('keypress', (e) => {
    if (e.which !== 13) return;

    addNewList({ name: e.target.value });
    cancel();
  });
  input.addEventListener('blur', cancel);
};

export default (listsContainer, addNewList) => {
  const container = createElement('div', {
    parent: listsContainer,
    className: 'add-list-btn',
  });

  const cancel = () => {
    clearElementChildren(container);
    prompt(container);
  };

  const openInput = () => {
    clearElementChildren(container);
    newListInput(container, addNewList, cancel);
  };

  container.addEventListener('click', openInput);

  prompt(container);
};
