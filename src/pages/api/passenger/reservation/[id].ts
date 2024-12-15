import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Passenger ID is required." });
  }

  try {
    const reservationDetails = await prisma.passenger.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        passengerDependents: true,
        attachments: true,
        bookings: true,
        waitingLists: true,
        seatings: true,
        user: true,
      },
    });
    const fromStation = await prisma.station.findFirst({
      where: { id: reservationDetails?.bookings[0].fromStationId },
    });
    const toStation = await prisma.station.findFirst({
      where: { id: reservationDetails?.bookings[0].toStationId },
    });

    reservationDetails.bookings[0].fromStationName = fromStation?.name;
    reservationDetails.bookings[0].toStationName = toStation?.name;


    if (!reservationDetails) {
      return res.status(404).json({ error: "Passenger not found." });
    }

    res.status(200).json({ reservationDetails });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservation details." });
  }
}
