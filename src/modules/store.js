import { combineReducers, createStore } from "redux";
//reducer
import list from "./reducer/list";

const rootReducer = combineReducers({ list });

const store = createStore(rootReducer);

export default store;
