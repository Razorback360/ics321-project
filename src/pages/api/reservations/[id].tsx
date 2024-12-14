import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    const { passengerId, fromStationId, toStationId, ticketId, seatingId, date } = req.body;
    const reservation = await prisma.booking.create({
      data: {
        passengerId,
        fromStationId,
        toStationId,
        ticketId,
        seatingId,
        date: new Date(date),
      },
    });
    res.status(200).json(reservation);
  } else if (req.method === 'PUT') {
    const { fromStationId, toStationId, ticketId, seatingId, date } = req.body;
    const reservation = await prisma.booking.update({
      where: { id: Number(id) },
      data: { fromStationId, toStationId, ticketId, seatingId, date: new Date(date) },
    });
    res.status(200).json(reservation);
  } else if (req.method === 'DELETE') {
    await prisma.booking.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Reservation deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
