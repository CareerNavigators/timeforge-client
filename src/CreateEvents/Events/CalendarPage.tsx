import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { Badge, Calendar, Modal } from "antd";
import DropDownCal from "./DropDownCal";
import toast from "react-hot-toast";

interface EventItem {
  content: string;
}

interface EventMap {
  [key: string]: EventItem[];
}

const CalendarPage: React.FC = () => {
  const [event, setEvent] = useState<EventMap>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const onSelectTime = (time: string) => {
    if (!selectedTimes.includes(time)) {
      setSelectedTimes([...selectedTimes, time]);
      if (selectedDate) {
        updateEvent(selectedDate, time);
      }
    } else {
      toast("Already selected");
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelect = (date: Dayjs, info: { source: string }) => {
    if (info.source === "date") {
      showModal();
      setSelectedDate(date);
      setSelectedTimes([]);
    }
  };

  const updateEvent = (date: Dayjs, time: string) => {
    const newEvent = { ...event };

    const inside: EventItem = { content: time || "" };
    const dateKey = date.format("DDMMYY");

    if (newEvent[dateKey]) {
      const isTimeAlreadySelected = newEvent[dateKey].some(
        (item) => item.content === time
      );

      if (!isTimeAlreadySelected) {
        newEvent[dateKey].push(inside);
      }
    } else {
      newEvent[dateKey] = [inside];
    }

    setEvent(newEvent);
  };

  const dateCellRender = (value: Dayjs) => {
    const data = event[value.format("DDMMYY")] || [];

    return (
      <ul className="events">
        {data.map((item, index) => (
          <li key={index}>
            <Badge status="success" text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <Calendar onSelect={onSelect} cellRender={cellRender} />
      <Modal
        title="Enter time"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <ul>
            {selectedTimes.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
        <DropDownCal onSelectTime={onSelectTime} />
      </Modal>
    </div>
  );
};

export default CalendarPage;
