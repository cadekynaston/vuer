<template>
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
    <tr v-for="repo in tableData" :key="repo.id">
      <td><strong>{{repo.name}}</strong></td>
      <td nowrap>
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
      <td>{{formatDate(repo.created_at, 'MM/D/YYYY')}}</td>
      <td>{{formatDate(repo.updated_at, 'MM/D/YYYY')}}</td>
    </tr>
  </tbody>
  </table>
</template>

<script>
import { formatDate } from '../shared/mixins';

export default {
  name: 'RepoTable',
  props: {
    tableData: Array,
  },
  mixins: [formatDate],
};
</script>
