import moment from 'moment';
import dateFormat from 'dateformat';

// import lineGraphTemplate from './graphTemplates';

const createNumberOfReposByYear = (repos) => {
  const cleanRepos = [...repos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .filter(repo => repo.fork === false);

  let datePlaceholder = moment();
  const earliestRepoDate = new Date(cleanRepos[0].created_at);
  const reposByDate = [
    {
      date: new Date(datePlaceholder),
      numberOfRepos: 0,
    },
  ];

  while (datePlaceholder > earliestRepoDate) {
    datePlaceholder = new Date(moment(datePlaceholder).subtract((2), 'months'));
    reposByDate.push({ date: datePlaceholder, numberOfRepos: 0 });
  }
  reposByDate.sort((a, b) => a.date - b.date);

  cleanRepos.forEach((repo, i) => {
    const nextIndex = reposByDate.findIndex(r => new Date(repo.created_at) < r.date);
    reposByDate[nextIndex].numberOfRepos = i + 1;
  });

  let numberOfRepos = 0;
  reposByDate.map((repo) => {
    const tempRepo = repo;
    if (tempRepo.numberOfRepos === 0) {
      tempRepo.numberOfRepos = numberOfRepos;
    }
    ({ numberOfRepos } = tempRepo);
    return repo;
  });

  return reposByDate.reduce((all, current) => {
    all.datasets[0].data.push(current.numberOfRepos);
    all.labels.push(dateFormat(current.date, 'mmm yyyy'));
    return all;
  }, {
    labels: [],
    datasets: [
      {
        label: 'Total number of repos',
        backgroundColor: 'green',
        data: [],
      },
    ],
  });
};

const createTotalSizeOfReposByYear = (repos) => {
  const cleanRepos = [...repos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .filter(repo => repo.fork === false);

  let datePlaceholder = moment();
  const earliestRepoDate = new Date(cleanRepos[0].created_at);
  const reposByDate = [
    {
      date: new Date(datePlaceholder),
      sizeOfRepos: 0,
    },
  ];

  while (datePlaceholder > earliestRepoDate) {
    datePlaceholder = new Date(moment(datePlaceholder).subtract((2), 'months'));
    reposByDate.push({ date: datePlaceholder, sizeOfRepos: 0 });
  }
  reposByDate.sort((a, b) => a.date - b.date);
  let test = 0;
  cleanRepos.forEach((repo) => {
    const nextIndex = reposByDate.findIndex(r => new Date(repo.created_at) < r.date);
    test += repo.size / 1000;
    reposByDate[nextIndex].sizeOfRepos = test;
  });

  let sizeOfRepos = 0;
  reposByDate.map((repo) => {
    const tempRepo = repo;
    if (tempRepo.sizeOfRepos === 0) {
      tempRepo.sizeOfRepos = sizeOfRepos;
    }
    ({ sizeOfRepos } = tempRepo);
    return repo;
  });

  return reposByDate.reduce((all, current) => {
    all.datasets[0].data.push(current.sizeOfRepos);
    all.labels.push(dateFormat(current.date, 'mmm yyyy'));
    return all;
  }, {
    labels: [],
    datasets: [
      {
        label: 'Total size of repos',
        backgroundColor: 'red',
        data: [],
      },
    ],
  });
};

const createGraphData = (repos) => {
  const numberOfReposByYear = createNumberOfReposByYear(repos);
  const totalSizeOfReposByYear = createTotalSizeOfReposByYear(repos);

  return {
    numberOfReposByYear,
    totalSizeOfReposByYear,
  };
};


export default createGraphData;
