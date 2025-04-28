import { Router } from "express";
import { createJob, getJobs, scrapeJobs } from "../controllers/jobs";
const jobRouter = Router();

jobRouter.get("/jobs/scrape", scrapeJobs);
jobRouter.post("/jobs", createJob);
jobRouter.get("/jobs", getJobs);

export default jobRouter;
