<script>
import { Bar } from 'vue-chartjs';

const options = {
  scales: {
    xAxes: [{ stacked: true }],
    yAxes: [{
      stacked: true,
      ticks: {
        beginAtZero: true,
      },
    }],
  },
};
export default {
  extends: Bar,
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
