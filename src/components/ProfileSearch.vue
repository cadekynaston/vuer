<template>
  <div class="container">
    <div class="is-flex input-container margin-bottom align-items-center">
      <div class="field has-addons is-marginless">
        <p
          :class="{'is-loading': isLoading}"
          class="control has-icons-left is-large"
        >
          <input
            v-model="currentUserInput"
            @keyup.enter="getUserKeyPress"
            :disabled="isLoading"
            class="input is-medium full-width username-input"
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
            class="button is-medium is-primary"
            data-tracking="search-button"
          >
            Search
          </button>
        </p>
      </div>
      <span @click="helpClicked" class="icon is-large hover-pointer">
        <font-awesome-icon class="fas help-icon" :icon="['far', 'question-circle']" />
      </span>

      <div id="modal"
        class="modal"
        :class="{'is-active': helpActive}"
      >
        <div class="modal-background" @click="helpActive = false"></div>
        <div class="modal-content">
          <div class="box">
            <p class="is-size-5 has-text-weight-bold">What is GitHub?</p>
            <p class="margin-bottom-10">GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere. <a href="https://guides.github.com/activities/hello-world" target="_blank">Read more here.</a></p>
            <p class="is-size-5 has-text-weight-bold">Who do I search for?</p>
            <p class="margin-bottom-10">If you don't have a GitHub account or you're not sure who to search for, you can try these awesome developers below.</p>
            <button class="button margin-right-10 margin-bottom-10 is-primary" @click="getPopularUser('yyx990803')">Evan You</button>
            <button class="button margin-right-10 margin-bottom-10 is-primary" @click="getPopularUser('jgthms')">Jeremy Thomas</button>
            <button class="button margin-right-10 margin-bottom-10 is-primary" @click="getPopularUser('gaearon')">Dan Abromov</button>
            <button class="button margin-right-10 margin-bottom-10 is-primary" @click="getPopularUser('wesbos')">Wes Bos</button>
            <button class="button margin-right-10 margin-bottom-10 is-primary" @click="getPopularUser('getify')">Kyle Simpson</button>
            <button class="button margin-right-10 margin-bottom-10 is-primary" @click="getPopularUser('darkwing')">David Walsh</button>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="helpActive = false"></button>
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
  created() {
    document.onkeydown = (evt) => {
      const event = evt || window.event;
      if (event.keyCode === 27) {
        this.helpActive = false;
      }
    };
  },
  data() {
    return {
      currentUserInput: '',
      helpActive: false,
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
    getPopularUser(user) {
      this.helpActive = false;
      this.currentUserInput = user;
      this.$emit('getUser', user);
    },
    helpClicked() {
      this.helpActive = true;
    },
  },
};
</script>
