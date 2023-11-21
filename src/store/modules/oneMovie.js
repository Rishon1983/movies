import axios from "axios";
import constants from "../../../config.js";
//import general from "./general.js";
//import logger from "@fortawesome/vue-fontawesome/src/logger.js";

// initial state
const state = {
	movieData: {},
	isMoviePopupOpen: false
};

// getters are functions.
const getters = {};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	async openMoviePopup({commit}, id) {
		try {
			/*
			* add background layout and spinner
			* */
			commit('general/isBackgroundLayout', true, {root: true});

			const results = await Promise.all([
				actions.getMovieDetails(id),
				actions.getMovieCredits(id),
				actions.getMovieAccountStates(id)
			])

			const result = {
				movieDetails: results[0].data,
				movieCredits: results[1].data,
				movieAccountStates: results[2].data
			};

			commit('setMovieData', result);

			/*
			* open popup
			* */
			commit('setIsMoviePopupOpen', true);

		} catch (e) {
			alert(e);
		}


		/*
		* add background layout and spinner
		* */
		commit('general/isBackgroundLayout', true, {root: true});

		Promise.all([
			actions.getMovieDetails(id),
			actions.getMovieCredits(id),
			actions.getMovieAccountStates(id)
		])
			.then(results => {

				const result = {
					movieDetails: {...results[0].data},
					movieCredits: {...results[1].data},
					movieAccountStates: {...results[2].data},
				}

				console.log(result)

				//console.log(result)
				commit('setMovieData', result);

				/*
				* open popup
				* */
				commit('setIsMoviePopupOpen', true);
			})
			.catch(error => alert(error))
	},
	closeMoviePopup({commit}) {
		/*
		* remove background layout
		* */
		commit('general/isBackgroundLayout', false, {root: true});

		/*
		* set isMoviePopupOpen flag false to close popup
		* */
		commit('setIsMoviePopupOpen', false);
	},
	getMovieDetails(id) {
		const options = {
			method: 'GET',
			url: `${constants.API_LINK}/movie/${id}`,
			params: {language: 'en-US', api_key: constants.API_KEY},
			headers: {
				accept: 'application/json'
			}
		};

		return axios.request(options);
	},
	getMovieCredits(id) {
		const options = {
			method: 'GET',
			url: `${constants.API_LINK}/movie/${id}/credits`,
			params: {language: 'en-US', api_key: constants.API_KEY},
			headers: {
				accept: 'application/json'
			}
		};

		return axios.request(options);
	},
	getMovieAccountStates(id) {
		const options = {
			method: 'GET',
			url: `${constants.API_LINK}/movie/${id}/account_states`,
			params: {
				language: 'en-US',
				api_key: constants.API_KEY,
				session_id: constants.SESSION_ID
			},
			headers: {
				accept: 'application/json'
			}
		};

		return axios.request(options);
	}
};

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	setMovieData(state, data) {
		state.movieData = data;
	},
	setIsMoviePopupOpen(state, data) {
		state.isMoviePopupOpen = data;
	},
	setFavoriteStatus(state, data) {
		state.movieData.movieAccountStates.favorite = data;
	}
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}