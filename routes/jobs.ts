import { Router } from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobs";
const jobRouter = Router();

jobRouter.post("/jobs", createJob);
jobRouter.get("/jobs", getJobs);
jobRouter.put("/jobs/:id", updateJob);
jobRouter.delete("/jobs/:id", deleteJob);

export default jobRouter;
