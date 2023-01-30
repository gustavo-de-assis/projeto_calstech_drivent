import { Router } from "express";
import { getTicketTypes, getUserTicket, insertTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getUserTicket)
  .post("/", validateBody(createTicketSchema), insertTicket);

export { ticketsRouter };
