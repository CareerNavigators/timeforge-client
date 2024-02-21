import React from "react";
import {
  Body,
  Html,
  Container,
  Text,
  Heading,
  Head,
  Hr,
  Section,
  Img,
  Button,
} from "@react-email/components";
import dayjs from "dayjs";

interface ConfirmationEmailProps {
  eventId: string;
  eventName: string;
  eventDesc: string;
  eventDate?: string;
  eventTime?: string;
  attendeeEmail: string;
}

const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  eventId,
  eventName,
  eventDesc,
  eventDate,
  eventTime,
}) => {
  // Parse the event date and format it using dayjs
  const formattedEventDate = eventDate
    ? dayjs(eventDate, "DDMMYY").format("DD MMMM YYYY")
    : "";

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src="https://timeforge.vercel.app/logo.png"
              width="50"
              height="50"
              alt="Stripe"
            />
            <Heading style={timeForge}>Timeforge</Heading>
            <Hr style={hr} />
            <Heading style={confirm}>
              Congratulations!!! Your Reservation Is Done.
            </Heading>
            <Text style={paragraph}>
              Thanks for participating in this event. Checkout the Event details
              below...
            </Text>
            <Heading style={eventDetails}>
              Title: {eventName} <br />
              Date & Time: {formattedEventDate} at {eventTime}.
            </Heading>
            <Heading style={eventDetails}>
              Event Details:
            </Heading>
            <Text
              style={eventDetails}
              dangerouslySetInnerHTML={{ __html: eventDesc }}
            />
            <Button
              style={button}
              href={`https://timeforge.vercel.app/eventSlot/${eventId}`}
            >
              Event Link
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              TimeForge, Copyright &copy; 2024. All rights reserved
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const confirm = {
  color: "#656ee8",
  fontSize: "24px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const eventDetails = {
  color: "#656ee8",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};
const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
const timeForge = {
  color: "#7c3aed",
  fontSize: "12px",
  lineHeight: "16px",
};
