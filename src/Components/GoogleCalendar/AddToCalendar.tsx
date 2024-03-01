import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { useContext } from "react";
import AxiosSecure from "../../Hook/useAxios";
import { AuthContext } from "../../Provider/AuthContext";
import dayjs from "dayjs";
type Props = {
  type?: string;
  eventId?: string;
};
interface Event {
  summary: string;
  location?: string;
  description?: string; // This field is optional
  start: {
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
  }>;
  reminders?: {
    useDefault?: boolean;
    overrides?: Array<{
      method: string;
      minutes: number;
    }>;
  };
  conferenceData?: {
    createRequest?: {
      requestId: string; // Replace with a unique identifier for the request
      conferenceSolutionKey: {
        type: "hangoutsMeet";
      };
    };
  };
}

type SendData = {
  event: Event;
  userId?: string;
  eventId: string;
};
const AddToCalendar = ({
  type = "owner",
  eventId = "65cb3109f856923078cd7bf7",
}: Props) => {
  const event: Event = {
    summary: "Meeting with the team",
    location: "Conference Room 1",
    description: `
        <p>Discuss project updates and next steps.</p>
        <ul>
          <li><strong>Agenda:</strong></li>
          <li>Project status update</li>
          <li>Discussion on next steps</li>
        </ul>
        <p>Please bring your laptop.</p>
      `, 
    start: {
      dateTime: dayjs().format(),
      timeZone: "Asia/Dhaka",
    },
    end: {
      dateTime: dayjs().format(),
      timeZone: "Asia/Dhaka",
    },
    conferenceData: {
      createRequest: {
        requestId: eventId, // Replace with a unique identifier for the request
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    attendees: [
      {
        email: "saadhuzaifa2497@gmail.com",
        responseStatus: "accepted",
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "popup",
          minutes: 10,
        },
      ],
    },
  };
  const { userData, loading } = useContext(AuthContext);
  const caxios = AxiosSecure();
  const mutationAddCalendar = useMutation({
    mutationFn: async () => {
      const packet: SendData = { event: event, eventId: eventId };
      if (type == "owner") {
        packet.userId = userData._id;
      }
      const res = await caxios.post("/insertcalendar", packet);
      return res.data;
    },
  });

  return (
    <div>
      <Button
        type="primary"
        disabled={loading}
        onClick={() => {
          mutationAddCalendar.mutate();
        }}
      >
        Add to Calendar
      </Button>
    </div>
  );
};

export default AddToCalendar;
