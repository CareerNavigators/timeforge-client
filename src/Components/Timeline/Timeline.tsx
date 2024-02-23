import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Button, Card, Input, Modal, TimePicker } from "antd";
import "./Timeline.css";

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
  const [modalVisible, setModalVisible] = useState(false);

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
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined;
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
            {" "}
            {event.content}
          </time>
        </div>
      )
    );
  };

  return (
    <div>
      <Card
        className="w-[400px] mt-5 hover:shadow-md mx-auto"
        onClick={handleCardClick}
      >
        <section className="h-[25vh] dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-5xl px-4 py-2 mx-auto">
            <div className="grid gap-2 sm:grid-cols-12">
              <div className="col-span-12 mx-2 sm:col-span-4">
                <div className="text-center sm:text-left mb-14 before:block before:w-16 before:h-2 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-[#7c3aed]">
                  <h3 className="text-lg font-semibold">Metting with CEO</h3>
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
            <Input placeholder="Title" size="small" className="" />
            <Input placeholder="Email" className="" />
          </div>
          <TimePicker.RangePicker use12Hours format="h:mm a" />

          <Button id="btn-add" className="">
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Timeline;
