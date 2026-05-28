import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = `
New Brook Travel booking request:

Full Name: ${body.fullName}
Departure: ${body.departure}
Destination: ${body.destination}
Departure Date: ${body.departureDate}
Return Date: ${body.returnDate || "One-way / not provided"}
Passengers: ${body.passengers}
Ages: ${body.ages}
Email: ${body.email}
Phone: ${body.phone}
Notes: ${body.notes}
`;

    await resend.emails.send({
      from: "Brook Travel <onboarding@resend.dev>",
      to: "brookktravel@gmail.com",
      subject: "New Brook Travel Booking Request",
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);

    return NextResponse.json(
      { success: false, error: "Email failed" },
      { status: 500 }
    );
  }
}