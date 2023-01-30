import { prisma } from "@/config";
import { notFoundError } from "@/errors";
import { PayInfo } from "@/protocols";
import ticketRepository from "../ticket-repository";

async function getPaymentInfo(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function paymentProcess(info: PayInfo) {
  const { ticketId, cardData } = info;

  const ticket = await ticketRepository.findTicket(ticketId);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketRepository.findTicketType(ticket.ticketTypeId);
  if (!ticketType) throw notFoundError();

  await ticketRepository.updateTicket(ticketId);

  return await prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.slice(-4),
      value: ticketType.price,
    },
  });
}

const paymentRepository = {
  getPaymentInfo,
  paymentProcess,
};

export default paymentRepository;
