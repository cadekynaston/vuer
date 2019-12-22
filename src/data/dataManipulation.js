const createGraphData = ({ repos }) => {
  console.log(repos);

  repos.forEach((repo) => {
    console.log(repo.name, repo.size, repo.created_at);
  });
};

export default createGraphData;
