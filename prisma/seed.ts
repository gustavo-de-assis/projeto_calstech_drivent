import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { OK } from "http-status";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log({ event });

  let users = await prisma.user.create ({
    data:{
      id:1,
      email: "email@email.com",
      password: "12345",
      createdAt: dayjs().toDate(),
    }
  });

  let session = await prisma.session.create ({
    data:{
      id:1,
      userId:1,
      token: "tokentest",
      createdAt: dayjs().toDate(),
    }
  });
  
  let enrollment = await prisma.enrollment.create({
    data:{
      id:1,
      name: "inscricaoTeste",
      cpf: "11111111111",
      birthday: dayjs("2002-02-20").toDate(),
      phone: "999999999",
      userId: 1,
      createdAt: dayjs().toDate(),
    }
  });

  let ticketTypes = await prisma.ticketType.createMany({
    data:[
      {
        id: 1,
        name: "test1",
        price: 100000,
        isRemote: false,
        includesHotel: true,
        createdAt: dayjs().toDate(),
      },
      {
        id: 2,
        name: "test2",
        price: 30000,
        isRemote: true,
        includesHotel: false,
        createdAt: dayjs().toDate(),
      },
   ]
  });

  let tickets = await prisma.ticket.createMany ({
    data:[{
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: "PAID",
        createdAt: dayjs().toDate(),
      },
      {
        id: 2,
        ticketTypeId: 2,
        enrollmentId: 1,
        status: "RESERVED",
        createdAt: dayjs().toDate(),
      },
    ]
  });

}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
