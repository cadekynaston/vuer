const siteURL = window.location.origin;
const metaInfo = {
  title: 'Vuer | GitHub Profile Viewer',
  meta: [
    { name: 'description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { property: 'og:title', content: 'Vuer | GitHub Profile Viewer' },
    { property: 'og:description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: `${siteURL}/img/snapshot.png` },
  ],
};

export default metaInfo;
