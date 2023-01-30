import { getPaymentByTicketId, setPayment } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPaymentSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", validateBody(createPaymentSchema), setPayment);

export { paymentsRouter };
