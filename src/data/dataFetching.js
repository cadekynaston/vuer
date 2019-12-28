import moment from 'moment';

export const getGithubUser = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const json = await response.json();
    const dataTimestamp = moment(new Date()).format('MMM Do @ H:MM');
    const returnData = {
      ...json,
      dataTimestamp,
    };
    if (returnData.message === 'Not Found') {
      returnData.error = 'Not found';
    }
    return returnData;
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
  const reposCleaned = allRepos.filter(repo => !repo.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
  return reposCleaned;
};
