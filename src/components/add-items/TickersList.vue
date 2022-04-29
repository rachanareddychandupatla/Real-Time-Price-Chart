<template>
  <div>
    <div
      v-for="{ name, id } in tickers"
      :key="id"
      class="relative px-3 py-4 border-b-2 border-gray-700 ..."
    >
      <!-- <div v-if="edit">
        <input
          id="add-items"
          type="text"
          class="rounded-l-lg bg-gray-600 px-4 py-3 border-2 border-blue-800"
          placeholder="Edit the Ticker...."
          v-model="updatedValue"
          @keypress.enter="updateTickerValue(id)"
        />
        <div class="absolute right-3 top-4">
          <font-awesome-icon icon="xmark" class="mr-2" @click="onCancel(id)" />
          <font-awesome-icon icon="check" @click="updateTickerValue(id)" />
        </div>
      </div> -->
      <div>
        {{ name }}
        <div class="absolute right-3 top-4">
          <font-awesome-icon
            icon="trash-can"
            class="mr-2"
            @click="onDelete(id)"
          />
          <!-- <font-awesome-icon icon="edit" @click="onEdit(id)" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ITicker } from "../../store";

@Component({})
export default class TickersList extends Vue {
  private updatedValue: String = "";

  private get tickers(): ITicker[] {
    return this.$store.state.tickers;
  }

  private onDelete(index: String) {
    this.$store.commit(
      "updateTickers",
      this.tickers.filter((item) => item.id != index)
    );
  }

  private onEdit(id: String) {
    for (var i in this.tickers) {
      if (this.tickers[i].id == id) {
        this.tickers[i].edit = true;
      }
    }
    this.$store.commit("updateTickers", this.tickers);
  }

  private onCancel(id: String) {
    for (var i in this.tickers) {
      if (this.tickers[i].id == id) {
        this.tickers[i].edit = false;
      }
    }
    this.$store.commit("updateTickers", this.tickers);
  }

  private updateTickerValue(id: String) {
    for (var i in this.tickers) {
      if (this.tickers[i].id == id) {
        this.tickers[i].name = this.updatedValue;
        this.tickers[i].edit = false;
      }
    }
    this.$store.commit("updateTickers", this.tickers);
  }
}
</script>

<style></style>
