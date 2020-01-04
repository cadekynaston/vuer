<template>
  <div class="container">
    <div class="is-flex input-container margin-bottom">
      <div class="field has-addons">
        <p
          :class="{'is-loading': isLoading}"
          class="control has-icons-left is-large"
        >
          <input
            v-model="currentUserInput"
            @keyup.enter="getUserKeyPress"
            :disabled="isLoading"
            class="input is-large full-width username-input"
            type="text"
            placeholder="GitHub Username"
            data-tracking="search-input"
          />
          <span class="icon is-left">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
        </p>
        <p class="control">
          <button
            @click="getUser"
            :disabled="isLoading"
            class="button is-large is-primary"
            data-tracking="search-button"
          >
            Search
          </button>
        </p>
      </div>
    </div>

    <article
      v-if="userNotFound"
      class="message is-danger margin-bottom"
    >
      <div class="message-header">
        <p>Error</p>
        <button
          @click="updateUserFound"
          class="delete"
          aria-label="delete"
          data-tracking="search-notfound"
        ></button>
      </div>
      <div class="message-body">A GitHub account with that username does not exist.</div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ProfileSearch',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    userNotFound: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentUserInput: '',
    };
  },
  methods: {
    getUserKeyPress() {
      window.dataLayer.push({
        event: 'userSearchEnter',
        customSearchInput: this.currentUserInput,
      });
      this.$emit('getUser', this.currentUserInput);
    },
    getUser() {
      this.$emit('getUser', this.currentUserInput);
    },
    updateUserFound() {
      this.$emit('userNotFoundClosed');
    },
  },
};
</script>
