import moment from 'moment';

export const getGithubUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const json = await response.json();
  const dataTimestamp = moment(new Date()).format('MMM Do @ H:MM');
  const returnData = {
    ...json,
    dataTimestamp,
  };
  return returnData;
};

export const getGithubUserRepos = async (url) => {
  const response = await fetch(`${url}?sort=created&per_page=500`);
  const json = await response.json();
  const reposCleaned = json.filter(repo => !repo.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
  return reposCleaned;
};
