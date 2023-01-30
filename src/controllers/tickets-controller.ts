import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(_req: Request, res: Response) {
  try {
    const ticketTypes = await ticketService.getTicketTypes();
    if (!ticketTypes.length) {
      return res.status(httpStatus.NOT_FOUND).send(ticketTypes);
    }
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const userTicket = await ticketService.getUserTicket(userId);
    if (!userTicket) {
      return res.status(httpStatus.NOT_FOUND).send(userTicket);
    }
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function insertTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    const ticket = await ticketService.insertTicket(userId, ticketTypeId, "RESERVED");

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "Bad Request") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
