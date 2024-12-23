import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { passengerId, trainId, seatingId, scheduleId } = req.body;

  if (!passengerId || !trainId || !seatingId || !scheduleId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Fetch the train schedule for the selected train
    const trainSchedule = await prisma.trainSchedule.findFirst({
      where: { id: scheduleId },
      orderBy: { departTime: 'asc' },
    });

    if (!trainSchedule) {
      return res.status(404).json({ message: 'Train schedule not found' });
    }

    const { fromStationId, toStationId, departTime: date } = trainSchedule;

    // Create a ticket and booking in a transaction
    const booking = await prisma.$transaction(async (prisma) => {
      const ticket = await prisma.ticket.create({
        data: {
          price: 100, 
          tier: 'Economy', 
        },
      });

      return await prisma.booking.create({
        data: {
          passengerId,
          fromStationId,
          toStationId,
          date,
          seatingId,
          ticketId: ticket.id,
          percentage: 0,
        },
      });
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}
