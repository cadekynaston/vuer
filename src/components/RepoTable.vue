<template>
  <table class="table is-fullwidth is-hoverable is-narrow">
  <thead>
    <tr>
      <th nowrap>
        <p
          @click="sort('name')"
          class="hover-pointer"
          data-tracking="table-header"
        >
          Name
          <span class="icon fa-border" :class="sortSettings.column === 'name' ? 'has-background-warning' : ''">
            <font-awesome-icon :icon="['fas', 'sort']" />
          </span>
        </p>
      </th>
      <th>Links</th>
      <th nowrap>
        <p
          @click="sort('size')"
          class="hover-pointer"
          data-tracking="table-header"
        >
          Size (KB)
          <span class="icon fa-border" :class="sortSettings.column === 'size' ? 'has-background-warning' : ''">
            <font-awesome-icon :icon="['fas', 'sort']" />
          </span>
        </p>
      </th>
      <th nowrap>
        <p
          @click="sort('stargazers_count')"
          class="hover-pointer"
          data-tracking="table-header"
        >
            Stars
            <span class="icon fa-border" :class="sortSettings.column === 'stargazers_count' ? 'has-background-warning' : ''">
              <font-awesome-icon :icon="['fas', 'sort']" />
            </span>
        </p>
      </th>
      <th nowrap>
        <p
          @click="sort('forks')"
          class="hover-pointer"
          data-tracking="table-header"
        >
            Forks
            <span class="icon fa-border" :class="sortSettings.column === 'forks' ? 'has-background-warning' : ''">
              <font-awesome-icon :icon="['fas', 'sort']" />
            </span>
        </p>
      </th>
      <th nowrap>
        <p
          @click="sort('open_issues')"
          class="hover-pointer"
          data-tracking="table-header"
        >
            Issues
            <span class="icon fa-border" :class="sortSettings.column === 'open_issues' ? 'has-background-warning' : ''">
              <font-awesome-icon :icon="['fas', 'sort']" />
            </span>
        </p>
      </th>
      <th nowrap>
        <p
          @click="sort('language')"
          class="hover-pointer"
          data-tracking="table-header"
        >
            language
            <span class="icon fa-border" :class="sortSettings.column === 'language' ? 'has-background-warning' : ''">
              <font-awesome-icon :icon="['fas', 'sort']" />
            </span>
        </p>
      </th>
      <th nowrap>
        <p
          @click="sort('created_at')"
          class="hover-pointer"
          data-tracking="table-header"
        >
            Created
            <span class="icon fa-border" :class="sortSettings.column === 'created_at' ? 'has-background-warning' : ''">
              <font-awesome-icon :icon="['fas', 'sort']" />
            </span>
        </p>
      </th>
      <th nowrap>
        <p
          @click="sort('updated_at')"
          class="hover-pointer"
          data-tracking="table-header"
        >
            Updated
            <span class="icon fa-border" :class="sortSettings.column === 'updated_at' ? 'has-background-warning' : ''">
              <font-awesome-icon :icon="['fas', 'sort']" />
            </span>
        </p>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="repo in localTableData" :key="repo.id">
      <td :class="{'has-background-light': sortSettings.column === 'name'}"><strong>{{repo.name}}</strong></td>
      <td nowrap>
        <a
          :href="repo.html_url"
          target="_blank"
          data-tracking="table-link"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fab', 'github']" />
          </span>
        </a>
        <a
          v-if="repo.homepage !== null && repo.homepage !== ''"
          :href="repo.homepage"
          target="_blank"
          data-tracking="table-link"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'external-link-alt']" />
          </span>
        </a>
      </td>
      <td :class="{'has-background-light': sortSettings.column === 'size'}">{{repo.size}}</td>
      <td :class="{'has-background-light': sortSettings.column === 'stargazers_count'}">{{repo.stargazers_count}}</td>
      <td :class="{'has-background-light': sortSettings.column === 'forks'}">{{repo.forks}}</td>
      <td :class="{'has-background-light': sortSettings.column === 'open_issues'}">{{repo.open_issues}}</td>
      <td :class="{'has-background-light': sortSettings.column === 'language'}">{{repo.language}}</td>
      <td :class="{'has-background-light': sortSettings.column === 'created_at'}">{{formatDate(repo.created_at, 'MM/D/YYYY')}}</td>
      <td :class="{'has-background-light': sortSettings.column === 'updated_at'}">{{formatDate(repo.updated_at, 'MM/D/YYYY')}}</td>
    </tr>
  </tbody>
  </table>
</template>

<script>
import { formatDate } from '../shared/mixins';

// todo: make getclasses methods for cells

export default {
  name: 'RepoTable',
  props: {
    tableData: Array,
  },
  data() {
    return {
      sortSettings: {
        column: 'stargazers_count',
        order: 'desc',
      },
      localTableData: [...this.tableData],
    };
  },
  mixins: [formatDate],
  methods: {
    sort(column) {
      this.sortSettings.column = column;
      this.sortSettings.order = this.sortSettings.order === 'asc'
        ? 'desc'
        : 'asc';

      const sortSettings = {
        numeric: (column === 'stargazers_count' || column === 'forks' || column === 'size' || column === 'open_issues'),
      };

      this.localTableData.sort((a, b) => {
        const cleanA = a[column] !== null ? a[column] : '';
        const cleanB = b[column] !== null ? b[column] : '';

        return (
          this.sortSettings.order === 'asc'
            ? cleanA.toString().localeCompare(cleanB.toString(), undefined, sortSettings)
            : cleanB.toString().localeCompare(cleanA.toString(), undefined, sortSettings)
        );
      });
    },
    getCellClasses() {

    },
  },
  watch: {
    tableData(newValue) {
      this.localTableData = [...newValue];
    },
  },
};
</script>
