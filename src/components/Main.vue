<template>
  <section class="section">
    <h1 class="has-text-centered title is-size-2">GitHub Profile Viewer</h1>

      <ProfileSearch
        :isLoading="isLoading"
        :userNotFound="userNotFound"
        @getUser="getUser"
      />

    <div class="container">
      <div v-if="user" class="columns is-desktop">

        <div class="column is-one-third-desktop">
          <div class="box is-fullheight">

            <h5 class="title is-5">Profiles</h5>
            <div class="menu">
              <ul class="menu-list overflow-scroll max-height-200">
                <li v-for="u in users" :key="u.id">
                  <a v-bind:class="u.id === user.id ? 'is-active' : ''" @click="changeCurrentUser(u.id)" class=" is-size-5 is-relative">
                    {{u.login}}
                    <span v-if="u.id === user.id" class="is-size-7"><br />last pulled: {{u.dataTimestamp}}</span>
                    <!-- <button v-if="u.id === user.id" class="button is-small is-right absolute-right">Refresh</button> -->
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
                <div class="user-info">
                  <h2 class="title is-3">{{user.name}}</h2>

                  <p v-if="user.bio" class="subtitle">{{user.bio}}</p>

                  <div class="user-links margin-bottom-30">

                    <a :href="user.html_url" class="margin-right-10" target="_blank">
                      <button class="button margin-bottom-10">
                        <span class="icon">
                          <font-awesome-icon class="icon is-medium" :icon="['fab', 'github']" />
                        </span>
                        <span>GitHub</span>
                      </button>
                    </a>

                    <a v-if="user.blog" target="_blank" :href="`${user.blog}`">
                      <button class="button">
                        <span class="icon">
                          <font-awesome-icon class="icon is-medium" :icon="['fas', 'user-circle']" />
                        </span>
                        <span>Personal</span>
                      </button>
                    </a>

                  </div>

                  <div class="is-flex flex-column-small flex-wrap">
                    <div class="margin-right-10 margin-bottom-30">
                      <div class="tag is-info small slim-tag">
                        <p class="title is-1">{{user.followers}}</p>
                        <p class="subtitle">Followers</p>
                      </div>
                    </div>
                    <div class="margin-right-10 margin-bottom-30">
                      <div class="tag is-warning slim-tag">
                        <p class="title is-1">{{user.following}}</p>
                        <p class="subtitle">Following</p>
                      </div>
                    </div>
                    <div class="margin-right-10 margin-bottom-30">
                      <div class="tag is-success slim-tag">
                        <p class="title is-1">{{user.public_repos}}</p>
                        <p class="subtitle">Repos</p>
                      </div>
                    </div>
                  </div>
                  <div class="is-flex flex-wrap">
                    <div v-if="user.email" class="tag margin-right-10 margin-bottom-10 is-light">
                      <a :href="`mailto:${user.email}`">{{user.email}}</a>
                    </div>
                    <div v-if="user.company" class="tag margin-right-10 margin-bottom-10 is-info is-light">{{user.company}}</div>
                    <div v-if="user.location" class="tag margin-right-10 margin-bottom-10 is-info is-light">{{user.location}}</div>
                    <div v-if="user.created_at" class="tag margin-right-10 margin-bottom-10 is-info is-light">Joined: {{formatDate(user.created_at, 'MMMM Do, YYYY')}}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container margin-top">
      <div v-if="user" class="box is-primary">
        <h2 class="title is-2">Overview</h2>
        <div v-if="user.graphData">
          <div class="columns is-desktop">

            <div class="column has-text-centered is-one-third-desktop">
              <p class="is-size-5"><strong>Repos Over Time</strong></p>
              <LineChart class="chart" :chartData="user.graphData.numberOfReposByYear" />
            </div>

            <div class="column has-text-centered is-one-third-desktop">
              <p class="is-size-5"><strong>Popular Repos</strong></p>
              <Bar class="chart" :chartData="user.graphData.topReposByStars" />
            </div>

            <div class="column has-text-centered is-one-third-desktop">
              <p class="is-size-5"><strong>Languages</strong></p>
              <Doughnut class="chart" :chartData="user.graphData.languageTypes" />
            </div>

          </div>

          <article class="message is-warning">
            <div class="message-body">
              <div class="content is-small">
                <p class="is-marginless"><strong>NOTE:</strong></p>
                <ul style="margin-top: 0">
                  <li>Datasets may be toggled by clicking on the key for each graph.</li>
                  <li>Forked repos have been ommitted from these results.</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="container margin-top">
      <div v-if="user" class="box is-primary">
        <h2 class="title is-2">Repos</h2>
        <TableFilter @filterUpdated="filterRepos" />
        <div class="full-width overflow-scroll">
          <RepoTable :table-data="tableRepos" />
        </div>
      </div>
    </div>

  </section>
</template>

<script>

import LineChart from './charts/LineChart.vue';
import Doughnut from './charts/Doughnut.vue';
import Bar from './charts/Bar.vue';
import RepoTable from './RepoTable.vue';
import TableFilter from './TableFilter.vue';
import ProfileSearch from './ProfileSearch.vue';

import {
  getGithubUser, getGithubUserRepos, createGraphData,
} from '../data';

import { formatDate } from '../shared/mixins';

export default {
  name: 'Main',
  components: {
    LineChart,
    Doughnut,
    Bar,
    RepoTable,
    TableFilter,
    ProfileSearch,
  },
  mixins: [formatDate],
  data() {
    return {
      user: null,
      users: [],
      userNotFound: false,
      isLoading: false,
      tableRepos: [],
      currentUserInput: '',
    };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('u')) {
      this.getUser(urlParams.get('u'));
    }
  },
  methods: {
    async getUser(userInput) {
      this.isLoading = true;
      const user = await getGithubUser(userInput);

      if (user.error) {
        this.userNotFound = true;
      } else {
        if (user.public_repos > 0) {
          const repos = await getGithubUserRepos(user.repos_url);
          const graphData = createGraphData(repos);

          user.repos = repos;
          user.graphData = graphData;
        } else {
          user.repos = [];
          user.graphData = {};
        }
        this.setCurrentUser(user);

        /**
       * Checking if this user already exists and then removing them to avoid duplicates.
       */
        const currentUserIndex = this.users.findIndex(u => u.id === this.user.id);
        if (currentUserIndex !== -1) {
          this.users.splice(currentUserIndex, 1);
        }
        this.users = [user, ...this.users];
      }
      this.isLoading = false;
    },
    changeCurrentUser(id) {
      const index = this.users.findIndex(user => user.id === id);
      this.setCurrentUser(this.users[index]);
    },
    setCurrentUser(user) {
      this.user = user;
      this.tableRepos = this.user.repos;
    },
    filterRepos(filter) {
      this.tableRepos = this.user.repos.filter(repo => repo.name.toLowerCase().includes(filter.toLowerCase()));
    },
  },
};
</script>
