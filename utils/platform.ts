export const platforms = [
  {
    name: "HotNigerianJobs",
    urlTemplate: "https://www.hotnigerianjobs.com/alljobs/${i}",
    selectors: {
      jobItem: ".job-item",
      title: ".job-title a",
      company: ".company",
      location: ".location",
      link: ".job-title a",
    },
  },
  {
    name: "MyJobMag",
    urlTemplate: "https://www.myjobmag.com/featured-jobs",
    selectors: {
      jobItem: ".job-info",
      title: ".job-title",
      company: ".company-name",
      location: ".location",
      link: "a",
    },
  },
];
