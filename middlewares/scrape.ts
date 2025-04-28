import puppeteer from "puppeteer";
import { IJob } from "../models/jobs";

interface IScrapeConfig {
  name: string;
  urlTemplate: string;
  selectors: {
    jobItem: string;
    title: string;
    company: string;
    location: string;
    link: string;
  };
  pages?: number;
}

export const scrapePlatform = async (config: IScrapeConfig) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const jobs: IJob[] = [];

  try {
    for (let i = 1; i <= (config.pages || 2); i++) {
      await page.goto(config.urlTemplate.replace("${i}", i.toString()), {
        waitUntil: "networkidle2",
      });
      console.log({ page });
      const pageJobs = await page.evaluate((sel) => {
        return Array.from(document?.querySelectorAll(sel.jobItem) || [])
          .map((el) => ({
            title: el.querySelector(sel.title)?.textContent?.trim() || "",
            company: el.querySelector(sel.company)?.textContent?.trim() || "",
            location: el.querySelector(sel.location)?.textContent?.trim() || "",
            link: el.querySelector(sel.link)?.textContent?.trim() || "",
            source: config.name,
          }))
          .filter((job) => job.title && job.link);
      }, config.selectors);

      jobs.push(...pageJobs);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log({ pageJobs });
    }
  } finally {
    await browser.close();
  }

  return jobs;
};
