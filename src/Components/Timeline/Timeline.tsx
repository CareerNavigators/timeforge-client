import { useState } from "react";
import { Card, Modal } from "antd";
import { Link } from "react-router-dom";

export interface TimelineData {
  _id: string;
  title: string;
  email: string;
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

  return (
    <>
      <Card
        style={{ width: 300 }}
        className="mt-5 hover:shadow-md"
        onClick={handleCardClick}
      >
        <p className="text-lg font-bold">{item.title}</p>
        <p className="text-[#7c3aed] font-semibold mt-2">Email: {item.email}</p>
        <p className="w-fit px-2 my-2 rounded text-dw bg-[#7c3aed]">
          {item.startTime} - {item.endTime}
        </p>
        <Link
          className="bg-[#7c3aed] px-2 py-1 rounded text-dw"
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
        <p>Title: {item.title}</p>
        <p>Email: {item.email}</p>
        <p>Start Time: {item.startTime}</p>
        <p>End Time: {item.endTime}</p>
      </Modal>
    </>
  );
};

export default Timeline;
