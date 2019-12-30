const siteURL = window.location.origin;
const metaInfo = {
  title: 'Vuer | GitHub Profile Viewer',
  meta: [
    { name: 'description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { property: 'og:title', content: 'Vuer | GitHub Profile Viewer' },
    { property: 'og:description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteURL },
    { property: 'og:site_name', content: 'Vuer | GitHub Profile Viewer' },
    { property: 'og:image', content: `${siteURL}/img/snapshot.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '600' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: siteURL },
    { property: 'twitter:site', content: '@cadekynaston' },
    { property: 'twitter:title', content: 'Vuer | GitHub Profile Viewer' },
    { property: 'twitter:description', content: 'Vuer is a GitHub profile viewing tool to easily get a feel for someones github account.' },
    { property: 'twitter:image', content: `${siteURL}/img/snapshot.png` },
    { property: 'twitter:image:alt', content: 'Vuer | GitHub Profile Viewer' },
  ],
};

export default metaInfo;
