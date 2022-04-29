<template>
  <div>
    <highcharts :options="barChartOptions" height= "100%" width="100%" :ref="'chart'"></highcharts>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { debounce } from "lodash";

@Component({
  components: {},
})
export default class BarChart extends Vue {
  private isReloadNeeded = false;
  private hasAnyTicker =  false;
  private setDebounce = debounce(() => this.isReloadNeeded = false, 300);

  @Prop({ required: true })
  private barChartOptions: any;

  private get tickers() {
    return this.$store.state.tickers;
  }

  private get isShowChart() {
    return this.$store.state.isShowChart;
  }
}
</script>
