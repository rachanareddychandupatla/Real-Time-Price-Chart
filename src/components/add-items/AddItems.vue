<template>
  <div class="px-8 py-10">
    <h1 class="text-lg px-2 py-4 font-bold text-center">ADD A TICKER</h1>
    <div class="container">
      <input
        id="add-items"
        type="text"
        class="rounded-l-lg bg-gray-600 px-4 py-3 border-2 border-blue-800"
        v-model="newTicker"
        placeholder="Add a ticker..."
        @keypress.enter="addTicker"
      />
      <button
        @click="addTicker"
        :disabled="!showAddTicker"
        :class="[showAddTicker ? active : inActive]"
      >
        Add ticker
      </button>
      <button
        :disabled="!isActive"
        @click="showChart()"
        :class="[isActive ? active : inActive]"
      >
        {{ text }}
      </button>
      <TickersList
        @showAddTicker="showAddTicker = $event"
        @text="text = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TickersList from "./TickersList.vue";
import { ITicker } from "../../store/";
import { uniqueId } from "lodash";

@Component({
  components: { TickersList },
})
export default class AddItems extends Vue {
  private showAddTicker: Boolean = true;
  private newTicker: String = "";
  private active =
    "bg-gradient-to-r from-indigo-700 to-purple-800 ... px-2 py-3.5 rounded-lg ml-2 inline";
  private inActive =
    "bg-gradient-to-r from-indigo-700 to-purple-800 ... px-2 py-3.5 rounded-lg ml-2 opacity-50 cursor-not-allowed inline";

  addTicker() {
    let ticker = this.newTicker;
    if (
      ticker.trim().length != 0 &&
      this.tickers.filter((e) => e.name === this.newTicker).length == 0
    ) {
      this.$store.commit("addTicker", {
        id: uniqueId("id"),
        name: this.newTicker.toUpperCase(),
        edit: false,
      });
      this.newTicker = "";
      this.$store.commit("isActive", this.tickers.length > 0);
    }
  }

  private get tickers(): ITicker[] {
    return this.$store.state.tickers;
  }

  private get isActive() {
    return this.$store.state.isActive;
  }

  
  private get isShowChart() {
    return this.$store.state.isShowChart;
  }

  private get text() {
    if (this.isShowChart) {
      this.showAddTicker = true;
      return "Show RealTime Chart";
    } else {
      this.showAddTicker = false;
      return "Stop RealTimeChart";
    }
  }

  private showChart() {
    this.$store.commit("isShowChart", !this.isShowChart);
  }
}
</script>

<style></style>
