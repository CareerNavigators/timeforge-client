import React, { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { Badge, Calendar, Modal } from "antd";
import "./style.css";

interface CalendarPageProps {
  selectedTimes: { [date: string]: string[] };
  onSelectTime: (times: string[]) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({
  onSelectTime: propOnSelectTime,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<{
    [date: string]: string[];
  }>({});

  const [modalOpen, setModalOpen] = useState<boolean>(true);

  useEffect(() => {
    if (modalOpen) {
      setSelectedTimes({});
    }
  }, [modalOpen]);

  const handleCheckboxChange = (time: string) => {
    const currentDateKey = selectedDate?.format("DDMMYY");

    if (currentDateKey) {
      const isSelected = selectedTimes[currentDateKey]?.includes(time);

      setSelectedTimes((prevSelectedTimes) => ({
        ...prevSelectedTimes,
        [currentDateKey]: isSelected
          ? prevSelectedTimes[currentDateKey]?.filter(
              (selectedTime) => selectedTime !== time
            ) || []
          : [...(prevSelectedTimes[currentDateKey] || []), time],
      }));
    }
  };

  const generateTimes = (
    startHour: number,
    endHour: number,
    interval: number
  ) => {
    const times: { time: string; checked: boolean }[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedTime = `${hour % 12 || 12}:${
          minute === 0 ? "00" : minute
        } ${hour >= 12 ? "PM" : "AM"}`;
        times.push({ time: formattedTime, checked: false });
      }
    }
    return times;
  };

  const timesWithCheckboxes = generateTimes(9, 16, 30);

  const handleOk = () => {
    const dateKey = selectedDate?.format("DDMMYY");
    const timesForSelectedDate = selectedTimes[dateKey || ""] || [];
    onSelectTime(timesForSelectedDate);
    setModalOpen(false);
    setIsModalVisible(false);
  };

  const showModal = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelect = (date: Dayjs, info: { source: string }) => {
    if (info.source === "date") {
      showModal(date);
    }
  };

  const onSelectTime = (times: string[]) => {
    const dateKey = selectedDate?.format("DDMMYY") || "";
    setSelectedTimes({
      ...selectedTimes,
      [dateKey]: times,
    });
    setIsModalVisible(false);
    propOnSelectTime(times);
  };

  const dateCellRender = (value: Dayjs) => {
    const data = selectedTimes[value.format("DDMMYY")] || [];

    return (
      <ul className="events">
        {data.map((item, index) => (
          <li key={index}>
            <Badge status="success" text={item} />
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
    <div className="flex justify-center items-center lg:h-[88vh] overflow-auto pt-5 rounded-md">
      <Calendar
        className="lg:w-[40vw] h-fit m-5 p-5 rounded-md shadow-xl border-2 border-violet-500"
        onSelect={onSelect}
        cellRender={cellRender}
        mode={"month"}
        fullscreen={true}
      />

      <Modal
        title="Enter time"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <ul>
            {selectedDate &&
              selectedTimes[selectedDate.format("DDMMYY")]?.map(
                (time, index) => <li key={index}>{time}</li>
              )}
          </ul>
        </div>
        <div>
          <h3>Select Times:</h3>
          <ul className="grid grid-cols-4 mb-5 mt-2">
            {timesWithCheckboxes.map((timeData) => (
              <li key={timeData.time} className="py-1 mx-auto">
                <label className="flex w-20 justify-center bg-violet-100 border-[1px] border-violet-500 px-2 py-[2px] rounded">
                  <input
                    type="checkbox"
                    style={{ display: "none" }}
                    checked={timeData.checked}
                    onChange={() => handleCheckboxChange(timeData.time)}
                  />
                  {timeData.time}
                </label>
              </li>
            ))}
          </ul>
          <div>
            <h3>Selected Times:</h3>
            <ul className="grid grid-cols-6 gap-5">
              {selectedTimes[selectedDate?.format("DDMMYY") || ""]?.map(
                (selectedTime) => (
                  <li
                    className="border-2 border-violet-100 text-center rounded"
                    key={selectedTime}
                  >
                    {selectedTime}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
