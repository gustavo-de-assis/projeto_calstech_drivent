import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketRepository.findMany();

  return ticketTypes;
}

const ticketService = {
  getTicketTypes,
};

export default ticketService;
