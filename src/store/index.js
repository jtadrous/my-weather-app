import Vue from "vue";
import Vuex from "vuex";

//Credit: database of worldcities from https://simplemaps.com/data/world-cities
//csv file was converted into a json file
import worldcities from "../store/worldcities.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    world: worldcities
  },
  mutations: {},
  actions: {},
  modules: {},
});
