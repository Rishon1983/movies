import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import store from "./store/index.js";

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
	faStar as fasStar,
	faXmark,
	faHeart
} from '@fortawesome/free-solid-svg-icons';

import {
	faStar as farStar,
	//faHeart,
	faThumbsUp,
	faImage
} from '@fortawesome/free-regular-svg-icons';

library.add(
	farStar, fasStar, faHeart, faThumbsUp, faXmark, faImage);

const app = createApp(App);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount('#app');
