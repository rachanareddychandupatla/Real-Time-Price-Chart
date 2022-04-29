<template>
  <div class="flex">
    <div><AddItems /></div>
    <div><BChart :barChartOptions="barChartOptions"></BChart></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import AddItems from "./AddItems.vue"; // @ is an alias to /src
import BChart from "./BChart.vue"; // @ is an alias to /src
import { ITicker } from "../../store/";
import { HTTP } from "../../services/api";
import moment from "moment";

@Component({
  components: {
    AddItems,
    BChart,
  },
})
export default class HomePage extends Vue {
  private barChartSeriesData = [];
  private setIntervalForFetch!: number;
  private length = 0;
  private initial = 0;

  @Watch("isShowChart")
  async fetchData() {
    if (!this.isShowChart) {
      this.fetchStocksData(this.tickers);
      this.setIntervalForFetch = setInterval(
        () => this.fetchStocksData(this.tickers),
        5000
      );
    } else {
      // this.barChartSeriesData = [];
      this.length = 0;
      clearInterval(this.setIntervalForFetch);
    }
  }

  @Watch("tickers")
  async fetchHistoricalData() {
    console.log("called");
    this.barChartSeriesData = [];
    if (this.isActive) {
      console.log("called1")
      await this.fetchStocksData(this.tickers);
    }
  }

  async fetchStocksData(tickers: ITicker[]) {
    try {
      const responses = await Promise.all(
        tickers.map((ticker) =>
          HTTP.get(`/quote?symbol=${ticker.name.toUpperCase()}`)
        )
      );
      this.$store.commit("xData", moment().format("hh:mm:ss A"));

      const prices = responses.map((item: any, index) => {
        if (item.c == 0 && item.d == null) {
          this.$store.commit("setTickerList", tickers.pop());
          alert("Please add valid Ticker");
        } else {
          return item.data.c;
        }
      });
      console.log(prices);
      this.initial++;
      console.log(prices);
      this.length += prices.length;
      this.dataSet(prices);
      this.$store.commit("priceData", prices);
    } catch (e) {
      console.error(`There is an error please try again ${e}`);
    }
  }

  private get tickers() {
    return this.$store.state.tickers;
  }

  private get isShowChart() {
    return this.$store.state.isShowChart;
  }

  private dataSet(prices: any[]) {
    let names = this.barChartSeriesData?.map((item: any) => item.name);
    for (var i = 0; i < this.tickers.length; i++) {
      let index = names.indexOf(this.tickers[i].name);

      if (index > -1) {
        (this.barChartSeriesData[i] as any).data.push(prices[i]);
        if ((this.barChartSeriesData[i] as any).data.length > 5) {
          let val = (this.barChartSeriesData[i] as any).data
            .reverse()
            .slice(0, 5)
            .reverse();
          (this.barChartSeriesData[i] as any).data = val;
          this.$store.commit("XValues");
        }
      } else {
        (this.barChartSeriesData as any).push({
          name: this.tickers[i].name,
          data:
            (this.barChartSeriesData[0] as any)?.data.length - 1 > 0
              ? Array((this.barChartSeriesData[0] as any)?.data.length - 1)
                  .fill(0)
                  .concat([prices[i]])
              : [prices[i]],
        });
      }
    }
  }

  private get prices() {
    return this.$store.state.prices;
  }

  private getCol(array: any, col: number) {
    var column = [];
    for (var i = 0; i < array.length; i++) {
      column.push(array[i][col]);
    }
    return column;
  }

  private get barChartOptions() {
    return {
      chart: {
        defaultSeriesType: "column",
        height: 750,
        width: 900,
        backgroundColor: "rgba(0,0,0,0)",
        style: {
          color: "#fff",
        },
      },
      title: {
        text: "Real Time Price Chart",
        style: {
          color: "#fff",
        },
      },
      xAxis: {
        categories: this.$store.state.xData,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Stock Value",
        },
        gridLineColor: "transparent",
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      legend: {
itemStyle:{'color':'white'}
      },
      series: this.barChartSeriesData,
    };
  }

  private get isActive() {
    return this.$store.state.isActive;
  }
}
</script>

<style></style>
