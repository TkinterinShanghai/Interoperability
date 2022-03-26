import faker from "@faker-js/faker";
import { prisma } from "../main";
import { adressGenerator } from "./util/adressGenerator";

export const createEntries = async () => {
  for (let i = 0; i < 777; ++i) {
    await prisma.fridge.create({
      data: {
        id: i,
        fridge_type: faker.commerce.product(),
        manufactured: faker.date.past(),
        model: faker.commerce.productName(),
        price: Number(faker.commerce.price(200, 1000)),
        volume: faker.datatype.number({ min: 50, max: 200 }),
      },
    });
    await prisma.customer.create({
      data: {
        id: i,
        lastactive: faker.date.past(),
        adress: adressGenerator(),
        phone: faker.datatype.number({ min: 1000000, max: 99999999999 }),
        email: faker.internet.email(),
        remarks: {
          text: faker.lorem.lines(1),
          meta: { importance: faker.datatype.number({ min: 1, max: 5 }) },
        },
      },
    });
    await prisma.complaint.create({
      data: {
        id: i,
        fridgeid: i,
        customerid: i,
        isresolved: faker.datatype.boolean(),
        issuedate: faker.date.past(),
        symptoms: faker.lorem.lines(1),
      },
    });
    await prisma.servicefacility.create({
      data: {
        id: i,
        adress: adressGenerator(),
        phone: faker.datatype.number({ min: 1000000, max: 99999999999 }),
        email: faker.internet.email(),
        active: faker.datatype.boolean(),
        ftype: faker.company.catchPhraseAdjective(),
      },
    });
    await prisma.employee.create({
      data: {
        id: i,
        salary: faker.datatype.number({ min: 1000, max: 10000 }),
        adress: adressGenerator(),
        email: faker.internet.email(),
        phone: faker.datatype.number({ min: 1000000, max: 99999999999 }),
        etype: faker.name.jobType(),
        facilityid: i,
      },
    });
    await prisma.repairpart.create({
      data: {
        partid: i,
        remarks: {
          text: faker.lorem.lines(1),
          meta: { importance: faker.datatype.number({ min: 1, max: 5 }) },
        },
        facilityid: i,
        material: faker.commerce.productMaterial(),
        price: faker.datatype.float({ min: 0.1, max: 2000 }),
        rname: faker.commerce.productName(),
        volume: faker.datatype.float({ min: 0.1, max: 200 }),
      },
    });
    await prisma.appointment.create({
      data: {
        id: i,
        complaintid: i,
        employeeid: i,
        handled: faker.date.past(),
        repairpartid: i,
        rating: faker.datatype.float({ min: 0, max: 5 }),
        servicefacilityid: i,
      },
    });
  }
};
