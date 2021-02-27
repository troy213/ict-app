import { createStore } from 'redux';

const initialState = {
  area: "",
  kode: "",
  noAwal: "",
  noAkhir: "",
  in: "",
  err: "",
  rendCond: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "handleChange":
      return Object.assign({}, state, { [action.store]: action.value });
    case "rubahRender":
      return Object.assign({}, state, { rendCond: !state.rendCond });
    case "handleError":
      return Object.assign({}, state, { err: action.value });
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
