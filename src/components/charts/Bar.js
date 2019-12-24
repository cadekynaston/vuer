// CommitChart.js
import { Bar } from 'vue-chartjs';
/* eslint-disable no-underscore-dangle */


export default {
  extends: Bar,
  props: ['testData'],
  mounted() {
    this.renderChart(this.testData);
  },
  watch: {
    testData(newValue) {
      this.renderChart(newValue);
    },
  },

};
