import moment from 'moment';

import defaultColors from '../shared/colors';

const createNumberOfReposByYear = (repos) => {
  const cleanRepos = [...repos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  let datePlaceholder = moment();
  const earliestRepoDate = new Date(cleanRepos[0].created_at);
  const reposByDate = [
    {
      date: new Date(datePlaceholder),
      numberOfRepos: 0,
      sizeOfRepos: 0,
    },
  ];

  while (datePlaceholder > earliestRepoDate) {
    datePlaceholder = new Date(moment(datePlaceholder).subtract((2), 'months'));
    reposByDate.push({ date: datePlaceholder, numberOfRepos: 0 });
  }
  reposByDate.sort((a, b) => a.date - b.date);

  let totalSize = 0;
  cleanRepos.forEach((repo, i) => {
    const nextIndex = reposByDate.findIndex(r => new Date(repo.created_at) < r.date);
    totalSize += repo.size / 1000;

    reposByDate[nextIndex].numberOfRepos = i + 1;
    reposByDate[nextIndex].sizeOfRepos = totalSize.toFixed(2);
  });

  let numberOfRepos = 0;
  let sizeOfRepos = 0;
  reposByDate.map((repo) => {
    const tempRepo = repo;
    if (tempRepo.numberOfRepos === 0) {
      tempRepo.numberOfRepos = numberOfRepos;
      tempRepo.sizeOfRepos = sizeOfRepos;
    }
    ({ numberOfRepos, sizeOfRepos } = tempRepo);
    return repo;
  });


  return reposByDate.reduce((all, current) => {
    all.datasets[0].data.push(current.numberOfRepos);
    all.datasets[1].data.push(current.sizeOfRepos);
    all.labels.push(moment(current.date).format('MMM YYYY'));
    return all;
  }, {
    labels: [],
    datasets: [
      {
        label: 'Repos',
        borderColor: '#3298dc',
        fill: false,
        data: [],
      },
      {
        label: 'Total size of repos (in MB)',
        borderColor: '#48C774',
        fill: false,
        data: [],
      },
    ],
  });
};

const createLanguageTypes = (repos) => {
  const data = repos.reduce((all, current) => {
    const tempAll = all;
    if (!current.language) {
      return tempAll;
    } if (tempAll[current.language] === undefined) {
      tempAll[current.language] = 1;
    } else {
      tempAll[current.language] += 1;
    }
    return tempAll;
  }, {});

  const returnData = {
    labels: [],
    datasets: [
      {
        label: 'Languages',
        backgroundColor: defaultColors,
        data: [],
      },
    ],
  };

  Object.keys(data).forEach((item) => {
    returnData.labels.push(item);
    returnData.datasets[0].data.push(data[item]);
  });
  return returnData;
};

const createTopReposByStars = (repos) => {
  let sortedRepos = [...repos].sort((a, b) => (b.stargazers_count + b.forks_count) - ((a.stargazers_count + a.forks_count)));

  if (sortedRepos.length > 5) sortedRepos = sortedRepos.slice(0, 5);

  const returnData = {
    labels: [],
    datasets: [
      {
        label: 'Stars',
        backgroundColor: defaultColors[5],
        data: [],
      },
      {
        label: 'Forks',
        backgroundColor: defaultColors[1],
        data: [],
      },
    ],
  };
  sortedRepos.forEach((repo) => {
    returnData.labels.push(repo.name);
    returnData.datasets[0].data.push(repo.stargazers_count);
    returnData.datasets[1].data.push(repo.forks_count);
  });
  return returnData;
};

const createGraphData = (repos) => {
  const numberOfReposByYear = createNumberOfReposByYear(repos);
  const languageTypes = createLanguageTypes(repos);
  const topReposByStars = createTopReposByStars(repos);

  return {
    numberOfReposByYear,
    languageTypes,
    topReposByStars,
  };
};


export default createGraphData;
