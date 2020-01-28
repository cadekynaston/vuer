<template>
  <section class="section min-height-100 is-flex flex-column space-between padding-bottom-0 ">
    <div>
      <h1 class="has-text-centered title is-size-2">GitHub Profile Viewer</h1>
      <ProfileSearch
        :isLoading="isLoading"
        :userNotFound="userNotFound"
        @getUser="getUser"
        @userNotFoundClosed="updateUserNotFound"
      />

      <div class="container">
        <div v-if="user" class="columns is-desktop">

          <div class="column is-one-third-desktop">
            <div class="box is-fullheight">

              <div class="menu">
                <p class="menu-label">
                  Profiles
                </p>
                <ul class="menu-list overflow-auto max-height-200">
                  <li
                    v-for="u in users"
                    :key="u.id"
                  >
                    <a
                      v-bind:class="{'is-active': u.id === user.id}"
                      @click="changeCurrentUser(u.id)"
                      class=" is-size-5 is-relative"
                      data-tracking="profile-user"
                    >
                      {{u.login}}
                      <span
                        v-if="u.id === user.id"
                        class="is-size-7"
                      >
                        <br />Latest Fetch: {{formatDate(u.dataTimestamp, 'MMM Do @ H:MM')}}
                      </span>
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
                    <img
                      :src="user.avatar_url"
                      :alt="`${user.login}'s avatar`"
                    >
                  </figure>
                </div>

                <div class="column">
                  <div class="user-info">
                    <h2 v-if="user.name" class="title is-3">{{user.name}}</h2>
                    <h2 v-else class="title is-3">{{user.login}}</h2>
                    <p v-if="user.bio" class="subtitle">{{user.bio}}</p>

                    <div class="user-links margin-bottom-30">

                      <a
                        :href="user.html_url"
                        class="margin-right-10"
                        target="_blank"
                      >
                        <button class="button margin-bottom-10" data-tracking="user-button">
                          <span class="icon">
                            <font-awesome-icon class="icon is-medium" :icon="['fab', 'github']" />
                          </span>
                          <span>GitHub</span>
                        </button>
                      </a>

                      <a
                        v-if="user.blog"
                        target="_blank"
                        :href="userBlogURL"
                        >
                        <button
                          class="button"
                          data-tracking="user-button"
                        >
                          <span class="icon">
                            <font-awesome-icon
                              class="icon is-medium"
                              :icon="['fas', 'user-circle']"
                            />
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
                      <div v-if="user.email" class="tag margin-right-10 margin-bottom-10">
                        <a
                          :href="`mailto:${user.email}`"
                          data-tracking="user-tag"
                        >{{user.email}}</a>
                      </div>
                      <div
                        v-for="company in userCompanies"
                        class="tag margin-right-10 margin-bottom-10"
                        :key="company"
                      >
                        <a
                          v-if="company.includes('@')"
                          :href="`https://github.com/${company.replace('@', '')}`"
                          class="is-flex align-items-center"
                          target="_blank"
                          data-tracking="user-tag"
                        >
                          <span class="icon" style="margin-right: 0">
                            <font-awesome-icon
                              class="icon"
                              :icon="['fa', 'user-friends']"
                            />
                          </span>
                          {{company}}
                        </a>
                        <div v-else class="is-flex align-items-center">
                          <span class="icon" style="margin-right: 0">
                            <font-awesome-icon
                              class="icon"
                              :icon="['fa', 'user-friends']"
                            />
                          </span>
                          {{company}}
                        </div>
                      </div>
                      <div v-if="user.location" class="tag margin-right-10 margin-bottom-10">
                        <span class="icon" style="margin-right: 0">
                          <font-awesome-icon
                            class="icon"
                            :icon="['fa', 'map-marker-alt']"
                          />
                        </span>
                        {{user.location}}</div>
                      <div v-if="user.created_at" class="tag margin-right-10 margin-bottom-10">
                        <span class="icon" style="margin-right: 0">
                          <font-awesome-icon
                            class="icon"
                            :icon="['fa', 'calendar-plus']"
                          />
                        </span>
                        {{formatDate(user.created_at, 'MMMM Do, YYYY')}}
                      </div>
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
          <div v-if="graphData">
            <div class="columns is-desktop">

              <div
                class="column has-text-centered is-one-third-desktop"
                data-tracking="graph-time"
              >
                <p class="is-size-5"><strong>Repos Over Time</strong></p>
                <LineChart
                  class="chart"
                  :chartData="graphData.numberOfReposByYear"
                />
              </div>

              <div
                class="column has-text-centered is-one-third-desktop"
                data-tracking="graph-popular"
              >
                <p class="is-size-5"><strong>Popular Repos</strong></p>
                <Bar
                  class="chart"
                  :chartData="graphData.topReposByStars"
                />
              </div>

              <div
                class="column has-text-centered is-one-third-desktop"
                data-tracking="graph-languages"
              >
                <p class="is-size-5"><strong>Languages</strong></p>
                <Doughnut
                  class="chart"
                  :chartData="graphData.languageTypes"
                />
              </div>

            </div>

            <article class="message is-warning">
              <div class="message-body">
                <div class="content is-small">
                  <p class="is-marginless"><strong>NOTE:</strong></p>
                  <ul style="margin-top: 0">
                    <li>Datasets may be toggled by clicking on the key for each graph.</li>
                    <li>Private {{includeForks ? "" : "and forked "}}repos have been omitted from these results.</li>
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
          <div class="full-width overflow-auto">
            <RepoTable :table-data="tableRepos" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="user">
      <label class="checkbox" style="font-size: 0.8rem; margin-top: 1.25rem">
        <input type="checkbox" name="show-forks" v-bind:checked="includeForks" @change="toggleForks(!includeForks)">
        Enable forked repositories
      </label>
    </div>

    <div class="footer margin-top has-background-white">
      <p class="has-text-centered">Created by <a href="https://cade.codes" target="_blank" data-tracking="footer-link">Cade Kynaston</a> using <a href="https://vuejs.org/" target="_blank" data-tracking="footer-link">Vue</a> + <a href="https://www.chartjs.org/" target="_blank" data-tracking="footer-link">Charts.js</a> + <a href="https://bulma.io/" target="_blank" data-tracking="footer-link">Bulma</a>.<br class="is-hidden-desktop"/> Check out the code <a href="https://github.com/cadekynaston/vuer" target="_blank" data-tracking="footer-link">here</a>.</p>

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
      includeForks: true,
      graphData: {},
      tableRepos: [],
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
        this.userNotFound = false;
        user.repos = user.public_repos > 0 ? await getGithubUserRepos(user.repos_url) : [];
        this.setCurrentUser(user);
        this.updateGraph();

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
      this.tableRepos = this.relevantRepos;
      /* eslint-disable no-restricted-globals */
      history.pushState(null, null, `?u=${this.user.login}`);
    },
    filterRepos(filter) {
      this.tableRepos = this.relevantRepos.filter(repo => repo.name.toLowerCase().includes(filter.toLowerCase())
        || repo.created_at.toLowerCase().includes(filter.toLowerCase())
        || repo.updated_at.toLowerCase().includes(filter.toLowerCase())
        || (repo.language && repo.language.toLowerCase().includes(filter.toLowerCase())));
    },
    updateGraph() {
      if (this.relevantRepos.length > 0) {
        this.graphData = createGraphData(this.relevantRepos);
      }
    },
    updateUserNotFound() {
      this.userNotFound = false;
    },
    toggleForks(includeForks) {
      this.includeForks = includeForks;
      this.tableRepos = this.relevantRepos;
      this.updateGraph();
    },
  },
  computed: {
    relevantRepos() {
      const withForkFilter = this.includeForks
        ? this.user.repos
        : this.user.repos.filter(repo => !repo.fork);
      return this.user ? withForkFilter : [];
    },
    userCompanies() {
      if (this.user && this.user.company) {
        return this.user.company.trim().split(' ');
      }
      return [];
    },
    userBlogURL() {
      if (this.user.blog) {
        try {
          const blogURL = new URL(this.user.blog);
          return blogURL;
        } catch {
          return `https://${this.user.blog}`;
        }
      }
      return null;
    },
  },
};
</script>
