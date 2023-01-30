import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus, TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketRepository.findMany();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getUserTicket(userId: number) {
  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();

  return await ticketRepository.findTicketByEnrolment(enrollment.id);
}

async function insertTicket(userId: number, ticketTypeId: number, status: TicketStatus) {
  const ticketType = await ticketRepository.findTicketType(ticketTypeId);
  if (!ticketType) throw { name: "Bad Request" };

  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();

  return await ticketRepository.insertTicket(enrollment.id, ticketTypeId, status);
}

const ticketService = {
  getTicketTypes,
  getUserTicket,
  insertTicket,
};

export default ticketService;
