import dateFormat from 'dateformat';

export const getGithubUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const json = await response.json();
  const dataTimestamp = dateFormat(new Date(), 'mmm dS @ H:MM');
  const returnData = {
    ...json,
    dataTimestamp,
  };
  return returnData;
};

export const getGithubUserRepos = async (url) => {
  const response = await fetch(`${url}?sort=created&per_page=500`);
  const json = await response.json();
  const reposForksRemoved = json.filter(repo => !repo.fork);
  return reposForksRemoved;
};
