import axios from "axios";
import constants from "../../../config.js";

// initial state
const state = {
	mainList: [],
	currentPage: 0,
	totalPages: 1
};

// getters are functions.
const getters = {
	async getPopularMovies() {
		const options = {
			method: 'GET',
			url: `${constants.API_LINK}/movie/popular`,
			params: {
				language: 'en-US',
				page: state.currentPage,
				api_key: constants.API_KEY
			},
			headers: {
				accept: 'application/json'
			}
		};

		return axios.request(options);
	},
	async getBroadcastMovies() {
		const options = {
			method: 'GET',
			url: `${constants.API_LINK}/movie/now_playing`,
			params: {
				language: 'en-US',
				page: state.currentPage,
				api_key: constants.API_KEY
			},
			headers: {
				accept: 'application/json'
			}
		};

		return axios.request(options);
	},
	async getFavoritesMovies() {
		const options = {
			method: 'GET',
			url: `${constants.API_LINK}/account/${constants.ACCOUNT_ID}/favorite/movies`,
			params: {
				language: 'en-US',
				page: state.currentPage,
				sort_by: 'created_at.asc',
				api_key: constants.API_KEY,
				session_id: constants.SESSION_ID
			},
			headers: {
				accept: 'application/json'
			}
		};

		return axios.request(options);
	},
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	async getData({commit, state}, mode) {
		if (state.currentPage >= state.totalPages) return;

		commit('setCurrentPage');
		switch (mode) {
			case 'popular':
				try {
					const result = await getters.getPopularMovies();
					commit('setMainListAndTotalPages', result.data);
				} catch (e) {
					alert(e);
				}
				break;

			/*
			* ES6 just for example
			* */
			/*actions.getPopularMovies()
				.then(result => {
					commit('setMainListAndTotalPages', result.data);
				})
				.catch(error => alert(error));
			break;*/
			case 'broadcast':
				try {
					const result = await getters.getBroadcastMovies();
					commit('setMainListAndTotalPages', result.data);
				} catch (e) {
					alert(e);
				}
				break;
			case 'favorites':
				try {
					const result = await getters.getFavoritesMovies();
					commit('setMainListAndTotalPages', result.data);
				} catch (e) {
					alert(e);
				}
				break;
			default:
		}

		// actions.getPopularMovies()
		// 	.then(result => {
		// 		commit('setMainList', result.data.results);
		// 	})
		// 	.catch(error => alert(error));


		// Promise.all([
		// 	actions.getPopularMovies(),
		// 	actions.getFavoritesMoviesList()
		// ])
		// 	.then(results => {
		// 		console.log(results[0])
		// 		console.log(results[1])
		// 		commit('setMainList', results[0].data.results);
		// 	})
		// 	.catch(error => alert(error))
	},
	/**
	 * Change currentPage num to next one
	 * @param commit
	 */
	setCurrentPage({commit}) {
		commit('setCurrentPage');
	},
	resetListStateByDefault({commit}) {
		commit('resetListStateByDefault');
	},
	async favoriteMovieAction({commit, rootGetters}, data) {
		try {

			const options = {
				method: 'POST',
				url: `${constants.API_LINK}/account/${constants.ACCOUNT_ID}/favorite`,
				params: {
					language: 'en-US',
					api_key: constants.API_KEY,
					session_id: constants.SESSION_ID
				},
				data: {media_type: 'movie', media_id: data.movieDetails.id, favorite: data.favorite},
				headers: {
					accept: 'application/json',
					'content-type': 'application/json'
				}
			};

			await axios.request(options);

			commit('oneMovie/setFavoriteStatus', data.favorite, {root: true})

			const selectedModeIndex = rootGetters["general/getSelectedModeIndex"];
			/*
			* need update data if now selected mode is "my favorites movies"
			* */
			if (selectedModeIndex === 2) {
				commit('updateFavoritesMainList', data);
			}
		} catch (e) {
			alert(e);
		}
	}

};

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	setMainListAndTotalPages(state, data) {
		state.mainList.push(...data.results);
		state.totalPages = data.total_pages;
	},
	setCurrentPage(state) {
		state.currentPage++;
	},
	resetListStateByDefault(state) {
		state.mainList = [];
		state.currentPage = 0;
		state.totalPages = 1;
	},
	updateFavoritesMainList(state, data) {
		if (data.favorite) {
			state.mainList.push(data.movieDetails);
		} else {
			state.mainList = state.mainList.filter(movie => movie.id !== data.movieDetails.id);
		}

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