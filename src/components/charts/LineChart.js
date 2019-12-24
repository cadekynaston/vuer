
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData);
  },
  watch: {
    chartData(newValue) {
      this.renderChart(newValue);
    },
  },

};
