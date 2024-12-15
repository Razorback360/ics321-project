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
    // Fetch passenger details
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

    if (!reservationDetails) {
      return res.status(404).json({ error: "Passenger not found." });
    }

    // Enhance the bookings with station names if bookings exist
    const enhancedBookings = await Promise.all(
      reservationDetails.bookings.map(async (booking) => {
        const fromStation = await prisma.station.findFirst({
          where: { id: booking.fromStationId },
        });
        const toStation = await prisma.station.findFirst({
          where: { id: booking.toStationId },
        });

        return {
          ...booking,
          fromStationName: fromStation?.name || null,
          toStationName: toStation?.name || null,
        };
      })
    );

    res.status(200).json({ ...reservationDetails, bookings: enhancedBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch reservation details." });
  }
}
