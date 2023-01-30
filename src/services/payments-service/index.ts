import { notFoundError, unauthorizedError } from "@/errors";
import { PayInfo } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

async function getPaymentInfo(ticketId: number, userId: number): Promise<Payment> {
  const ticket = await ticketRepository.findTicket(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();

  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  const paymentInfo = await paymentRepository.getPaymentInfo(ticketId);
  if (!paymentInfo) throw notFoundError();

  return paymentInfo;
}

async function paymentProcess(payment: PayInfo) {
  return await paymentRepository.paymentProcess(payment);
}

const paymentService = {
  getPaymentInfo,
  paymentProcess,
};

export default paymentService;
