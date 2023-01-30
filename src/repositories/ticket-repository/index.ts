import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findMany() {
  return await prisma.ticketType.findMany();
}

async function findTicketType(id: number) {
  return await prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function findTicket(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

async function findTicketByEnrolment(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function insertTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return await prisma.ticket.create({
    data: {
      status,
      ticketTypeId,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function updateTicket(id: number) {
  return await prisma.ticket.update({
    data: {
      status: "PAID",
    },
    where: {
      id,
    },
  });
}

const ticketRepository = {
  findMany,
  findTicket,
  findTicketByEnrolment,
  findTicketType,
  insertTicket,
  updateTicket,
};

export default ticketRepository;
