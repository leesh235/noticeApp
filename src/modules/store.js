import { combineReducers, createStore } from "redux";
//reducer
import list from "./reducer/list";
import detail from "./reducer/detail";
import contents from "./reducer/contents";

const rootReducer = combineReducers({ list, detail, contents });

const store = createStore(rootReducer);

export default store;
