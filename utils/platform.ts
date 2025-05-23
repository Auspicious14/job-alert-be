export const platforms = [
  {
    name: "HotNigerianJobs",
    urlTemplate: "https://www.hotnigerianjobs.com/alljobs/${i}",
    selectors: {
      title: ".jobheader",
      description: ".mycase4",
      jobItem: ".job-item",
      company: ".company",
      location: ".location",
      link: ".jobheader h1 a",
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
