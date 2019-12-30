const siteURL = window.location.origin;
const metaInfo = {
  title: 'Vuer | GitHub Profile Viewer',
  meta: [
    { name: 'description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { name: 'og:title', content: 'Vuer | GitHub Profile Viewer' },
    { name: 'og:description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { name: 'og:type', content: 'website' },
    { name: 'og:image', content: `${siteURL}/img/snapshot.png` },
  ],
};

export default metaInfo;
