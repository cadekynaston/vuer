<script>

import { Doughnut } from 'vue-chartjs';

const options = {
  rotation: 1 * Math.PI,
  circumference: 1 * Math.PI,
};

export default {
  extends: Doughnut,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, options);
  },
  watch: {
    chartData(newValue) {
      this.renderChart(newValue, options);
    },
  },

};
</script>
