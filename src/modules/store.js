import { combineReducers, createStore } from "redux";
//reducer
import list from "./reducer/list";
import detail from "./reducer/detail";

const rootReducer = combineReducers({ list, detail });

const store = createStore(rootReducer);

export default store;
