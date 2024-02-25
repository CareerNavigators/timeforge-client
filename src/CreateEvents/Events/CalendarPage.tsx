import { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { Badge, Button, Calendar, Modal } from "antd";
import "./style.css";

const CalendarPage = ({
  eventDuration,
  eventTime,
  selectedTimes,
  setSelectedTimes,
}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [modalTimes, setModalTimes] = useState<
    { time: string; checked: boolean }[]
  >([]);
  // const [selectedTimes, setSelectedTimes] = useState<{
  //   [key: string]: string[];
  // }>({});

  const handleCheckboxChange = (time: string) => {
    setModalTimes((prevModalTimes) =>
      prevModalTimes.map((modalTime) =>
        modalTime.time === time
          ? { ...modalTime, checked: !modalTime.checked }
          : modalTime
      )
    );
  };

  const handleTimeClick = (time: string) => {
    const updatedModalTimes = modalTimes.map((modalTime) =>
      modalTime.time === time
        ? { ...modalTime, checked: !modalTime.checked }
        : modalTime
    );
    setModalTimes(updatedModalTimes);
  };

  const generateTimes = () => {
    const [startTime, endTime] = eventTime;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const times = [];

    const startDate: any = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
    const endDate: any = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    const durationInMinutes = eventDuration;
    const slotCount = Math.ceil(
      (endDate - startDate) / (durationInMinutes * 60000)
    );

    const currentTime = new Date(startDate);
    for (let i = 0; i < slotCount; i++) {
      const formattedHour = currentTime.getHours();
      const formattedMinute = currentTime
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const period = formattedHour >= 12 ? "PM" : "AM";
      const formattedHour12 = formattedHour % 12 || 12;
      const formattedTime = `${formattedHour12}:${formattedMinute} ${period}`;
      times.push({ time: formattedTime, checked: false });

      currentTime.setMinutes(currentTime.getMinutes() + durationInMinutes);
    }

    return times;
  };

  const handleOk = () => {
    const selectedTimesForDate = modalTimes
      .filter((time) => time.checked)
      .map((time) => time.time);
    onSelectTime(selectedTimesForDate);
    setIsModalVisible(false);
    setModalTimes(modalTimes.map((time) => ({ ...time, checked: false })));
  };

  const showModal = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
    setModalTimes(generateTimes());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalTimes(modalTimes.map((time) => ({ ...time, checked: false })));
  };

  const onSelect = (date: Dayjs, info: { source: string }) => {
    if (info.source === "date") {
      showModal(date);
    }
  };

  const onSelectTime = (times: string[]) => {
    const dateKey = selectedDate?.format("DDMMYY") || "";
    const updatedSelectedTimes = {
      ...selectedTimes,
      [dateKey]: times,
    };
    setSelectedTimes(updatedSelectedTimes);
  };

  const dateCellRender = (value: Dayjs) => {
    const data = selectedTimes[value.format("DDMMYY")] || [];

    return (
      <ul className="events">
        {data.map((item: any, index: any) => (
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
    <div className="flex justify-center items-center">
      <Calendar
        className="lg:max-h-full max-h-[500px] lg:m-0 p-5 lg:mb-0 mb-10 dark:bg-d scroll-smooth lg:overflow-visible overflow-y-auto"
        onSelect={onSelect}
        cellRender={cellRender}
        mode={"month"}
        fullscreen={true}
      />

      <Modal title="Enter time" open={isModalVisible} footer={null}>
        <div>
          <ul className="grid grid-cols-4 mb-5 mt-2">
            {modalTimes.map((timeData) => (
              <li key={timeData.time} className="py-1 mx-auto">
                <label
                  className={`flex w-20 justify-center border-2 px-2 py-[2px] cursor-pointer hover:shadow-lg transition-all ease-in-out rounded ${
                    timeData.checked
                      ? "border-[#7c3aed] bg-[#7c3aed] text-white text-bold"
                      : "border-[#7c3aed] hover:bg-[#7c3aed1a]"
                  }`}
                  onClick={() => handleTimeClick(timeData.time)}
                >
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
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button
            onClick={handleOk}
            id="btn-confirm"
            className="px-6 font-semibold text-[#7c3aed] border-[#7c3aed]"
          >
            Confirm
          </Button>
          <Button
            onClick={handleCancel}
            id="btn-cancel"
            danger
            className="px-6 font-semibold"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
