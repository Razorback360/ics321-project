import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { passengerId: id } = req.query;

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
        // bookings: {
        //   include: {
        //     seating: true,
        //     luggages: true,
        //   },
        // },
      },
    });

    if (!reservationDetails) {
      return res.status(404).json({ error: "Passenger not found." });
    }

    res.status(200).json({ reservationDetails });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservation details." });
  }
}
