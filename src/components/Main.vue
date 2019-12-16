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
            <input v-model="userInput" v-on:keyup.enter="getUser" class="input is-medium full-width username-input" type="text" placeholder="Github Username">
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

            <h5 class="title is-5">Previous Profiles</h5>
            <div class="menu">
              <ul class="menu-list">
                <li v-for="u in users" :key="u.id">
                  <a v-bind:class="u.id === user.id ? 'is-active' : ''" @click="changeCurrentUser(u.id)" class=" is-size-5 is-relative">
                    {{u.name}}
                    <span v-if="u.id === user.id" class="is-size-7"><br />last pulled: Dec 15 @ 16:20</span>
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

    <div class="container">
      <div class="box is-primary">
        <div class="is-flex">
          <figure class="image max-256">
            <img class="" src="https://bulma.io/images/placeholders/256x256.png" alt="">
          </figure>
          <h2 class="is-size-3">Cade Kynaston</h2>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

import getGithubUser from '../data';

export default {
  name: 'Main',
  props: {
    msg: String,
  },
  data() {
    return {
      userInput: '',
      user: {
        login: 'cadekynaston',
        id: 16597609,
        node_id: 'MDQ6VXNlcjE2NTk3NjA5',
        avatar_url: 'https://avatars1.githubusercontent.com/u/16597609?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/cadekynaston',
        html_url: 'https://github.com/cadekynaston',
        followers_url: 'https://api.github.com/users/cadekynaston/followers',
        following_url: 'https://api.github.com/users/cadekynaston/following{/other_user}',
        gists_url: 'https://api.github.com/users/cadekynaston/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/cadekynaston/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/cadekynaston/subscriptions',
        organizations_url: 'https://api.github.com/users/cadekynaston/orgs',
        repos_url: 'https://api.github.com/users/cadekynaston/repos',
        events_url: 'https://api.github.com/users/cadekynaston/events{/privacy}',
        received_events_url: 'https://api.github.com/users/cadekynaston/received_events',
        type: 'User',
        site_admin: false,
        name: 'Cade Kynaston',
        company: '@clearlink',
        blog: 'https://cade.codes',
        location: 'Salt Lake City, UT',
        email: 'cadekynaston@gmail.com',
        hireable: true,
        bio: 'Software Developer\r\n',
        public_repos: 33,
        public_gists: 3,
        followers: 50,
        following: 21,
        created_at: 'July 1, 2016',
        updated_at: '2019-12-14T18:43:36Z',
      },
      users: [],
    };
  },
  async mounted() {
    // const user = await getGithubUser();
    // this.user = user;
  },
  methods: {
    async getUser() {
      const user = await getGithubUser(this.userInput);
      this.user = user;

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
