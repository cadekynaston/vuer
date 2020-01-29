const pruneUserData = (data) => {
  /* eslint-disable camelcase */
  const {
    login, id, node_id, avatar_url, url, html_url, repos_url, name, company, blog, location, email, bio, public_repos, followers, following, created_at, updated_at,
  } = data;

  return {
    login,
    id,
    node_id,
    avatar_url,
    url,
    html_url,
    repos_url,
    name,
    company,
    blog,
    location,
    email,
    bio,
    public_repos,
    followers,
    following,
    created_at,
    updated_at,
    dataTimestamp: new Date(),
  };
};

const pruneRepoData = (data) => {
  /* eslint-disable camelcase */
  const {
    id, name, html_url, description, fork, url, languages_url, created_at, updated_at, homepage, size, stargazers_count, watchers_count, language, forks_count, open_issues_count, forks, open_issues,
  } = data;

  return {
    id,
    name,
    html_url,
    description,
    fork,
    url,
    languages_url,
    created_at,
    updated_at,
    homepage,
    size,
    stargazers_count,
    watchers_count,
    language,
    forks_count,
    open_issues_count,
    forks,
    open_issues,
  };
};

export const getGithubUser = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const json = await response.json();

    if (json.message === 'Not Found') {
      json.error = 'Not found';
      return json;
    }

    return pruneUserData(json);
  } catch (error) {
    return error;
  }
};

const getRemainingRepos = async (url) => {
  let latestResponse = [];
  let allResponses = [];
  let pageCount = 2;
  // I need to await the response inside the loop to
  // determine if all repos have been found
  /* eslint-disable no-await-in-loop */
  do {
    const response = await fetch(`${url}?sort=created&per_page=100&page=${pageCount}`);
    latestResponse = await response.json();
    allResponses = [
      ...allResponses,
      ...latestResponse,
    ];
    pageCount += 1;
  } while (latestResponse.length === 100);
  return allResponses;
};

export const getGithubUserRepos = async (url) => {
  const response = await fetch(`${url}?sort=created&per_page=100`);
  const json = await response.json();
  let remainingRepos = [];

  if (json.length === 100) {
    remainingRepos = await getRemainingRepos(url);
  }
  const allRepos = [
    ...json,
    ...remainingRepos,
  ];
  const reposCleaned = allRepos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map(repo => pruneRepoData(repo));

  return reposCleaned;
};
