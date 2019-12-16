const getGithubUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const json = await response.json();
  return json;
};

export default getGithubUser;
