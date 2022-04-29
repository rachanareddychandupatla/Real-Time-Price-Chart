import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store<IState>({
  state: {
    tickers: [],
    prices: [],
    xData: [],
    size: 0,
    isShowChart: true,
  },
  getters: {},
  mutations: {
    addTicker(state, value: ITicker) {
      state.tickers.push(value);
    },
    updateTickers(state, value: ITicker[]) {
      state.tickers = value;
    },
    priceData(state, value: number[]) {
      state.size += value.length;
      if (state.size > 10) {
        state.prices = state.prices.slice(-5);
      }
      state.prices.push(value);
    },
    xData(state, value: String) {
      state.xData.push(value);
    },
    isShowChart(state, value: Boolean) {
      state.isShowChart = value;
    },
    setPriceData(state) {
      state.prices = [];
    },
    XValues(state) {
      state.xData = state.xData.reverse().slice(0,5).reverse();
    }
  },
  actions: {},
  modules: {},
});

export interface ITicker {
  id: String;
  name: String;
  edit: Boolean;
}

interface IState {
  tickers: ITicker[];
  prices: Array<Array<number>>;
  xData: String[];
  size: number;
  isShowChart: Boolean;
}
