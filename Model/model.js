import { cards as testCards, lists as testLists } from './test-data.js';

let idCount = 99;

export default bindFn => {

  const notifyUpdate = () => bindFn();

  const cards = [...testCards];
  const lists = [...testLists];

  const addCard = card => {
    card.id = `card-${idCount++}`;
    card.text = 'Enter a title';
    card.edit = true;
    cards.push(card);
    notifyUpdate();
  }

  return {
    lists: () => lists,
    cards: () => cards,
    addCard,
  };
}
