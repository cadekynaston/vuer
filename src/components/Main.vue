<template>
  <section class="section">
    <h1 class="has-text-centered title is-size-2">GitHub Profile Viewer</h1>

    <div class="container">
      <div class="is-flex input-container">
        <div class="field has-addons">
          <p class="control has-icons-left">
            <input v-model="currentUserInput" v-on:keyup.enter="getUser" class="input is-large full-width username-input" type="text" placeholder="Github Username">
            <span class="icon is-left">
              <font-awesome-icon class="" :icon="['fas', 'user']" />
            </span>
          </p>
          <p class="control">
            <button @click="getUser" class="button is-large is-primary">
              Search
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="columns is-desktop">

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
                    <div v-if="user.email" class="tag margin-right-10 is-light">
                      <a :href="`mailto:${user.email}`">{{user.email}}</a>
                    </div>
                    <div v-if="user.company" class="tag margin-right-10 is-info is-light">{{user.company}}</div>
                    <div v-if="user.location" class="tag margin-right-10 is-info is-light">{{user.location}}</div>
                    <div v-if="joinDate" class="tag margin-right-10 is-info is-light">Joined: {{joinDate}}</div>
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
      <div class="box is-primary overflow-scroll">
        <h2 class="title is-2">Repos</h2>
          <table class="table is-fullwidth is-hoverable is-narrow">
          <thead>
            <tr>
              <th>Name</th>
              <th>Links</th>
              <th>Size (KB)</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Issues</th>
              <th>Language</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="repo in user.repos" :key="repo.id">
              <td><strong>{{repo.name}}</strong></td>
              <td>
                <a :href="repo.html_url" target="_blank">
                  <span class="icon">
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </span>
                </a>
                <a v-if="repo.homepage !== null && repo.homepage !== ''" :href="repo.homepage"  target="_blank">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'external-link-alt']" />
                  </span>
                </a>
              </td>
              <td>{{repo.size}}</td>
              <td>{{repo.stargazers_count}}</td>
              <td>{{repo.forks}}</td>
              <td>{{repo.open_issues}}</td>
              <td>{{repo.language}}</td>
              <td>{{formatRepoDate(repo.created_at)}}</td>
              <td>{{formatRepoDate(repo.updated_at)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<script>
import moment from 'moment';

import LineChart from './charts/LineChart';
import Doughnut from './charts/Doughnut';
import Bar from './charts/Bar';

import {
  getGithubUser, getGithubUserRepos, dummyUsers, createGraphData,
} from '../data';

export default {
  name: 'Main',
  components: {
    LineChart,
    Doughnut,
    Bar,
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
  computed: {
    joinDate() {
      return this.user.created_at
        ? moment(this.user.created_at).format('MMMM Do, YYYY')
        : null;
    },
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
    formatRepoDate(date) {
      return moment(date).format('MM/D/YYYY');
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
