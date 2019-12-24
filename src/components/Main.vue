<template>
  <section class="section">
    <h1 class="has-text-centered title is-size-2">Github Profile Viewer</h1>
    <h2 class="subtitle has-text-centered">
      Built using <span class="has-text-primary">Vue</span> and <span class="has-text-primary">Bulma</span>
    </h2>
    <div class="container">
      <div class="is-flex input-container">
        <div class="field has-addons">
          <p class="control">
            <input v-model="currentUserInput" v-on:keyup.enter="getUser" class="input is-medium full-width username-input" type="text" placeholder="Github Username">
          </p>
          <p class="control">
            <button @click="getUser" class="button is-medium is-primary">
              Search
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="columns">

        <div class="column is-one-third">
          <div class="box is-fullheight">

            <h5 class="title is-5">Profiles</h5>
            <div class="menu">
              <ul class="menu-list overflow-scroll max-height-200">
                <li v-for="u in users" :key="u.id">
                  <a v-bind:class="u.id === user.id ? 'is-active' : ''" @click="changeCurrentUser(u.id)" class=" is-size-5 is-relative">
                    {{u.name}}
                    <span v-if="u.id === user.id" class="is-size-7"><br />last pulled: {{u.dataTimestamp}}</span>
                    <button v-if="u.id === user.id" class="button is-small is-right absolute-right">Refresh</button>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div class="column">
          <div class="box is-primary">
            <div class="columns">

              <div class="column is-3">
                <figure class="image max-200">
                  <img class="" :src="user.avatar_url" alt="">
                </figure>
              </div>

              <div class="column">
                <div class="user-info has-text-centered">
                  <h2 class="title is-3">{{user.name}}</h2>
                  <p class="subtitle">{{user.bio}}</p>
                  <div class="columns">
                    <div class="column has-text-centered">
                      <div class="tag is-info small slim-tag">
                        <p class="title is-1">{{user.followers}}</p>
                        <p class="subtitle">Followers</p>
                      </div>
                    </div>
                    <div class="column has-text-centered">
                      <div class="tag is-warning slim-tag">
                        <p class="title is-1">{{user.following}}</p>
                        <p class="subtitle">Following</p>
                      </div>
                    </div>
                    <div class="column has-text-centered">
                      <div class="tag is-success slim-tag">
                        <p class="title is-1">{{user.public_repos}}</p>
                        <p class="subtitle">Repos</p>
                      </div>
                    </div>
                  </div>
                  <div class="is-flex">
                    <div class="tag margin-right-10 is-info is-light">{{user.company}}</div>
                    <div class="tag margin-right-10 is-info is-light">{{user.location}}</div>
                    <div class="tag margin-right-10 is-info is-light">Joined: {{user.created_at}}</div>
                    <div class="tag margin-right-10 is-light">
                      <a href="mailto:cadekynaston@gmail.com">{{user.email}}</a></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container margin-top">
      <div class="box is-primary">
        <h2 class="title is-2">Repos</h2>
        <div v-if="user.graphData">
          <LineChart class="bar-chart" :chartData="user.graphData.numberOfReposByYear" />
          <LineChart class="bar-chart" :chartData="user.graphData.totalSizeOfReposByYear" />
        </div>
      </div>
    </div>

  </section>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep';
import LineChart from './charts/LineChart';

import {
  getGithubUser, getGithubUserRepos, dummyUsers, createGraphData,
} from '../data';

export default {
  name: 'Main',
  components: {
    LineChart,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      currentUserInput: '',
      user: dummyUsers[0],
      users: dummyUsers,
    };
  },
  async mounted() {
    // const user = await getGithubUser();
    // this.user = user;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('u')) {
      this.currentUserInput = urlParams.get('u');
      this.getUser();
    }
  },
  methods: {
    async getUser() {
      const user = await getGithubUser(this.currentUserInput);
      const repos = await getGithubUserRepos(user.repos_url);
      const graphData = createGraphData(repos);

      user.repos = repos;
      user.graphData = graphData;
      this.user = user;

      /**
       * Checking if this user already exists and then removing them to avoid duplicates.
       */
      const currentUserIndex = this.users.findIndex(u => u.id === this.user.id);
      if (currentUserIndex !== -1) {
        this.users.splice(currentUserIndex, 1);
      }
      this.users = [user, ...this.users];
    },
    changeCurrentUser(id) {
      const index = this.users.findIndex(user => user.id === id);
      this.user = this.users[index];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .input-container {
    justify-content: center;
    margin-bottom: 1.5rem;
  }
</style>
