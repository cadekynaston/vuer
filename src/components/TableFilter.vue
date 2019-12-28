<template>
  <div class="is-flex input-container">
    <div class="field">
      <p class="control has-icons-left is-large">
        <input v-model="currentRepoFilter" v-on:keyup="filterRepos" class="input is-large full-width username-input" type="text" placeholder="Filter Repos">
        <span class="icon is-left">
          <font-awesome-icon class="" :icon="['fas', 'search']" />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  data() {
    return {
      currentRepoFilter: '',
    };
  },
  methods: {
    filterRepos() {
      this.$emit('filterUpdated', this.currentRepoFilter);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
