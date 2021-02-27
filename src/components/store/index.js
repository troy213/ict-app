import { createStore } from 'redux';

const initialState = {
  area: "",
  kode: "",
  noAwal: "",
  noAkhir: "",
  in: "",
  rendCond: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "handleChange":
      return Object.assign({}, state, { [action.store]: action.value });
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
