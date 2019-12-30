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
            @keyup.enter="getUser"
            :disabled="isLoading"
            class="input is-large full-width username-input"
            type="text"
            placeholder="GitHub Username"
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
    getUser() {
      this.$emit('getUser', this.currentUserInput);
    },
    updateUserFound() {
      this.$emit('userNotFoundClosed');
    },
  },
};
</script>
