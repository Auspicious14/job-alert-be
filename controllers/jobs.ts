import { Request, Response } from "express";
import dotenv from "dotenv";
import { scrapePlatform } from "../middlewares/scrape";
import { handleErrors } from "../middlewares/errorHandler";
import { collections } from "../db";
import { platforms } from "../utils/platform";
import { IJob } from "../models/jobs";
dotenv.config();

export const scrapeJobs = async (req: Request, res: Response) => {
  try {
    const allJobs: IJob[] = [];

    for (const platform of platforms) {
      const jobs: IJob[] = await scrapePlatform(platform);
      allJobs.push(...jobs);
    }

    if (allJobs?.length > 0) {
      await collections.jobs.insertMany(
        allJobs.map((job) => ({
          ...job,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    }
    console.log({ allJobs });
    res
      .status(200)
      .json({ message: `Scraped ${allJobs.length} jobs`, jobs: allJobs });
  } catch (error) {
    console.error("Scraping error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ success: false, error: errors });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await collections.jobs.find({});

    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    const errors = handleErrors(error);
    res.status(500).json({ success: false, error: errors });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    // const validation = JobModel.collections.jobs.safeParse(req.body);
    // if (!validation.success) {
    //   return res.status(400).json({ errors: validation.error.errors });
    // }

    const newJob = await collections.jobs.insertOne(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Job creation error:", error);
    const errors = handleErrors(error);
    res.json({ success: false, error: errors });
  }
};
