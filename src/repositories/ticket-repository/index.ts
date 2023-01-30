import { prisma } from "@/config";

async function findMany() {
  return await prisma.ticketType.findMany();
}

/* async function findTicket(userId: number) {
    return await prisma.ticket.findUnique({
        where:{
            
        }
    })
} */

const ticketRepository = {
  findMany,
};

export default ticketRepository;
