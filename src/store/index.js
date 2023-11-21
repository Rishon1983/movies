import {createStore} from 'vuex'
import list from "./modules/list.js";
import oneMovie from "./modules/oneMovie.js";
import general from "./modules/general.js";

const store = createStore({ /* options */});

store.registerModule('general', general);
store.registerModule('list', list);
store.registerModule('oneMovie', oneMovie);

export default store;