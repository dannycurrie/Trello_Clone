import { cards as testCards, lists as testLists } from './test-data.js';

let idCount = 99;

const invalidate = (item) => ({ ...item, changed: true });
const validate = (item) => ({ ...item, changed: false, moved: false });
const notRemoved = (item) => !item.removed;

const getIdKeyedObject = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

const model = (notifyUpdate) => {
  const store = {
    cards: getIdKeyedObject(testCards.map(invalidate)),
    lists: testLists.map(invalidate),
  };

  const returnResource = (key) => {
    // get resource to return
    const res = store[key];

    // update resource in store to:
    // - remove `changed` flags, now that changed resources have been returned
    // - remove resources flagged to removed
    if (Array.isArray(res)) {
      store[key] = res.map(validate).filter(notRemoved);
      return res;
    } else {
      store[key] = getIdKeyedObject(
        Object.values(store[key]).map(validate).filter(notRemoved)
      );

      // return resource
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

  const addList = (list) => {
    list.id = `list-${idCount++}`;
    list.text = list.text;
    store.lists = [...store.lists, list];
    console.log('store.lists: ', store.lists);
    notifyUpdate();
  };

  const update = (type) => (id, data) => {
    if (type === 'card') {
      // if no card text, mark the card to be removed
      if (data.text === '') {
        store.cards[id] = { id, changed: true, removed: true };
      } else
        store.cards[id] = {
          ...store.cards[id],
          ...data,
          edit: false,
          changed: true,
        };
    }
    notifyUpdate();
  };

  return {
    lists: () => returnResource('lists'),
    cards: () => returnResource('cards'),
    addCard,
    addList,
    updateCard: update('card'),
  };
};

const observers = [];

const notifyObservers = () => {
  observers.forEach((ob) => ob());
};

// instantiate model
const appModel = model(notifyObservers);

export default (bindFn) => {
  observers.push(bindFn);
  return appModel;
};
