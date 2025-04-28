import { Router } from "express";
import { getSubscriptions, subscribe } from "../controllers/notification";

const router = Router();

router.get("/subscribe", getSubscriptions);
router.post("/subscribe", subscribe);

export default router;
