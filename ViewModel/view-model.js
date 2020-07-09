import { createElement } from '../Components/utils.js';
import getModel from '../Model/model.js';
import { bindKeyElements } from './utils.js';
import card from '../Components/card.js';
import list from '../Components/list.js';

export default () => {
  const model = getModel(bindModel);

  const { app } = bindKeyElements(document);
  const listsContainer = createElement('div', {
    className: 'lists-container',
    parent: app,
  });
  const createList = list(listsContainer, model.addCard);
  const createCard = card(model.updateCard);

  const createLists = () => {
    const lists = model.lists();
    console.log('lists: ', lists);
    lists.forEach(createList);
  };

  const createCards = () => {
    const cards = model.cards();
    cards.forEach(createCard);
  };

  function bindModel() {
    createLists();
    createCards();
  }

  return {
    bindModel,
  };
};
