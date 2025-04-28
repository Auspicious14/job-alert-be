import { Request, Response } from "express";
import dotenv from "dotenv";
import { handleErrors } from "../middlewares/errorHandler";
import { collections } from "../db";
import { ObjectId } from "monarch-orm";
dotenv.config();

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

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await collections.jobs.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...req.body, updatedAt: new Date() } }
      // { $upsert: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("Job update error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ success: false, error: errors });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await collections.jobs.deleteOne({ _id: new ObjectId(id) });
    res.status(204).send();
  } catch (error) {
    console.error("Job deletion error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ success: false, error: errors });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await collections.jobs.insertOne(jobData);
    res.status(201).json({
      _id: result._id,
      ...jobData,
    });
  } catch (error) {
    console.error("Job creation error:", error);
    const errors = handleErrors(error);
    res.status(400).json({ success: false, error: errors });
  }
};
