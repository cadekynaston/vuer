<script>
import { Line } from 'vue-chartjs';

const options = {
  scales: {
    xAxes: [{
      display: true,
      ticks: {
        callback(dataLabel, index) {
          return index % 2 === 0 ? dataLabel : '';
        },
      },
    }],
  },
};

export default {
  extends: Line,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, options);
  },
  watch: {
    chartData(newValue) {
      this.renderChart(newValue);
    },
  },

};
</script>
