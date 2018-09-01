import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "./reducer";

let store = null;

store = createStore(reducer, applyMiddleware(thunk,logger));

/**
 * @return Redux Store
 */
export default function configureStore() {
  return store;
}