import {
  ChangeEvent,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useContext,
  useState,
} from "react";
import { Button, Card, Input, Modal, TimePicker } from "antd";
import "./Timeline.css";
import showToast from "../../Hook/swalToast";
import { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import { Dayjs } from "dayjs";
import AxiosSecure from "../../Hook/useAxios";
import { AuthContext } from "../../Provider/AuthContext";

export interface Guest {
  position: string;
  email: string;
  speechTime: string | null;
}

export interface TimelineData {
  event: ReactNode;
  timeline: any;
  guests: Guest[];
  _id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  startTime: string;
  endTime: string;
}

interface TimelineProps {
  item: TimelineData;
}

const Timeline = ({ item }: TimelineProps) => {
  const { userData } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTime, setEventTime] = useState<any>();
  const [timelineTitle, setTimelineTitle] = useState<any>();
  const [content, setContent] = useState<any>();
  const [timeline, setTimeline] = useState<Array<unknown>>([]);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const axiosSecure = AxiosSecure();

  const handleCardClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderGuests = () => {
    return item.timeline.map(
      (
        event: {
          content:
            | string
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal;
          startTime: any;
          endTime: any;
        },
        index: Key | null | undefined
      ) => (
        <div
          key={index}
          className="flex flex-col my-3 sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:bg-[#7c3aed]"
        >
          <h3 className="text-lg font-semibold tracki text-[#6739b6]">
            {`${event.startTime} - ${event.endTime}`}
          </h3>
          <time className="text-xs tracki uppercase dark:text-gray-400">
            {event.content}
          </time>
        </div>
      )
    );
  };

  const handleTimelineTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTimelineTitle(e.target.value);
  };
  const handleContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleStartEndTime = (
    value: NoUndefinedRangeValueType<Dayjs>,
    dateString: string[]
  ) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
    const startHour = value[0]?.hour();
    const startMin = value[0]?.minute();
    const endHour = value[1]?.hour();
    const endMin = value[1]?.minute();
    const times = [
      { $H: startHour, $m: startMin },
      { $H: endHour, $m: endMin },
    ];

    const formattedTimes = times.map((time) => {
      const paddedHours = String(time.$H).padStart(2, "0");
      const paddedMinutes = String(time.$m).padStart(2, "0");
      return `${paddedHours}:${paddedMinutes}`;
    });
    setEventTime(formattedTimes);
    console.log(eventTime);
  };

  const handleSubmit = async () => {
    try {
      const newTimeline = {
        createdBy: userData?._id,
        title: timelineTitle,
        content: content,
        startTime: startTime,
        endTime: endTime,
      };

      axiosSecure.post("/timeline", newTimeline).then(() => {
        setTimeline((prevTimeline) => [...prevTimeline, newTimeline]);
        showToast("success", "Timeline added.");
      });
    } catch (error) {
      console.error("Error adding task:", error);
      showToast("error", "Please fill in all required fields.");
    }
  };

  return (
    <div>
      <Card
        className="w-[400px] mt-5 hover:shadow-md mx-auto"
        onClick={handleCardClick}
      >
        <section className="h-fit dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-5xl px-4 py-2 mx-auto">
            <div className="grid gap-2 sm:grid-cols-12">
              <div className="col-span-12 mx-2 sm:col-span-4">
                <div className="text-center sm:text-left mb-14 before:block before:w-16 before:h-2 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-[#7c3aed]">
                  <h3 className="text-lg font-semibold">Meeting with CEO</h3>
                  <span className="text-sm font-semibold tracki uppercase text-gray-600">
                    {item.eventDate}
                  </span>
                </div>
              </div>
              <div className="relative col-span-10 space-y-6 sm:col-span-8">
                <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                  <div className="mt-5">{renderGuests()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Card>

      <Modal
        title="Timeline Details"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Input
              value={timelineTitle}
              onChange={handleTimelineTitle}
              name="title"
              placeholder="Title"
              size="small"
              className=""
            />
            <Input
              name="content"
              onChange={handleContent}
              placeholder="Email"
              className=""
            />
          </div>
          <TimePicker.RangePicker
            use12Hours
            format="h:mm a"
            onChange={handleStartEndTime}
          />

          <Button onClick={handleSubmit} id="btn-add" className="">
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Timeline;
