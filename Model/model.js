import { cards as testCards, lists as testLists } from './test-data.js';

let idCount = 99;

const invalidate = (item) => ({ ...item, changed: true });
const validate = (item) => ({ ...item, changed: false });

const getIdKeyedObject = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export default (bindFn) => {
  const notifyUpdate = () => bindFn();

  const store = {
    cards: getIdKeyedObject(testCards.map(invalidate)),
    lists: testLists.map(invalidate),
  };

  const returnResource = (key) => {
    const res = store[key];
    if (Array.isArray(res)) {
      store[key] = res.map(validate);
      return res;
    } else {
      store[key] = getIdKeyedObject(Object.values(store[key]).map(validate));
      return Object.values(res);
    }
  };

  const addCard = (card) => {
    card.id = `card-${idCount++}`;
    card.text = '';
    card.edit = true;
    card.changed = true;
    store.cards[card.id] = card;
    notifyUpdate();
  };

  const update = (type) => (id, data) => {
    console.log('id, data: ', id, data);
    if (type === 'card') {
      store.cards[id] = { ...data, edit: false, changed: true };
    }
    notifyUpdate();
  };

  return {
    lists: () => returnResource('lists'),
    cards: () => returnResource('cards'),
    addCard,
    updateCard: update('card'),
  };
};
