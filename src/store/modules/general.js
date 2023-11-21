import axios from "axios";
import constants from "../../../config.js";

// initial state
const state = {
	backgroundLayout: false,
	spinner: false,
	selectedModeIndex: 0,
	modes: [
		{
			title: 'Popular movies',
			name: 'popular'
		},
		{
			title: 'Currently broadcast',
			name: 'broadcast'
		},
		{
			title: 'My favorites movies',
			name: 'favorites'
		}
	]
};

// getters are functions.
const getters = {
	getSelectedModeIndex(state) {
		return state.selectedModeIndex;
	}
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	setSelectedModeIndex({commit}, data) {
		commit('setSelectedModeIndex', data);
	}
};

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	isBackgroundLayout(state, data) {
		state.backgroundLayout = data;
	},
	setSelectedModeIndex(state, data) {
		state.selectedModeIndex = data;
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