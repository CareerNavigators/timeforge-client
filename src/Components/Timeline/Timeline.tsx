import { useState } from "react";
import { Button, Card, Input, Modal, TimePicker } from "antd";
import { Link } from "react-router-dom";
import "./Timeline.css";

export interface Guest {
  position: string;
  email: string;
  speechTime: string | null;
}

export interface TimelineData {
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
    return item.guests.map((guest, index) => (
      // <div key={index} className="text-[#7c3aed] font-semibold mt-2 p-2">
      //   <div className="flex flex-col">
      //     <span className="text-d"> {guest.position}</span>
      //     <span className="text-[#7c3aed]"> {guest.email}</span>
      //   </div>
      //   <span className="text-d"> {guest.speechTime}</span>
      // </div>

      <div
        key={index}
        className="flex flex-col my-3 sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:bg-[#7c3aed]"
      >
        <h3 className="text-lg font-semibold tracki text-[#6739b6]">{guest.position}</h3>
        <time className="text-xs tracki uppercase dark:text-gray-400">
          {guest.email}
        </time>
      </div>
    ));
  };

  return (
    <>
      <Card
        className="w-[500px] mt-5 hover:shadow-md mx-auto"
        onClick={handleCardClick}
      >
        {/* <div className="">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{item.eventTitle}</p>
            <p className="w-fit px-2 my-2 rounded-full border-[1px] border-[#7c3aed]">
              {item.eventDate}
            </p>
            <p className="w-fit px-2 my-2 rounded text-dw bg-[#7c3aed]">
              {item.eventTime}
            </p>
          </div>
          <div className="flex justify-center gap-3">{renderGuests()}</div>
        </div> */}
        <section className="h-[34vh] dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-5xl px-4 py-2 mx-auto">
            <div className="grid gap-4 mx-4 sm:grid-cols-12">
              <div className="col-span-12 sm:col-span-4">
                <div className="text-center sm:text-left mb-14 before:block before:w-16 before:h-2 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-[#7c3aed]">
                  <h3 className="text-lg font-semibold">{item.eventTitle}</h3>
                  <span className="text-sm font-semibold tracki uppercase text-gray-600">
                    {item.eventDate}
                  </span>
                </div>
              </div>
              <div className="relative col-span-10 space-y-6 sm:col-span-8">
                <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                  <p className="mt-5">{renderGuests()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Link
          id="btn-details"
          className="bg-[#7c3aed] px-2 py-1 mt-5 rounded text-dw w-full flex justify-center"
          to={"/singleTimeline"}
        >
          Details
        </Link>
      </Card>
      <Modal
        title="Timeline Details"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <div className="space-y-3 flex flex-col">
          <Input placeholder="Title" className="" />
          <Input placeholder="Email" className="" />
          <TimePicker.RangePicker use12Hours format="h:mm a" />
          <Button id="btn-add" className="">
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Timeline;
