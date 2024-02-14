import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { Badge, Calendar, Modal } from "antd";
import "./style.css";

const CalendarPage = ({
  selectedTimes,
  setSelectedTimes,
  eventDuration,
}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [modalTimes, setModalTimes] = useState<
    { time: string; checked: boolean }[]
  >([]);
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  useEffect(() => {
    if (modalOpen) {
      setSelectedTimes({});
    }
  }, [modalOpen, setSelectedTimes]);

  useEffect(() => {
    setModalTimes(generateTimes(9, 16, eventDuration));
  }, [eventDuration]);

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

  const generateTimes = (
    startHour: number,
    endHour: number,
    eventDuration: number
  ) => {
    const times: { time: string; checked: boolean }[] = [];
    let minuteIncrement = eventDuration;
    let hourIncrement = 0;

    if (eventDuration > 60) {
      hourIncrement = Math.floor(eventDuration / 60);
      minuteIncrement = eventDuration % 60;
    }

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += minuteIncrement) {
        const adjustedHour =
          hour + Math.floor((minute + minuteIncrement) / 60) + hourIncrement;
        const adjustedMinute = (minute + minuteIncrement) % 60;
        const formattedHour = adjustedHour % 12 || 12;
        const formattedMinute = adjustedMinute.toString().padStart(2, "0");
        const period = adjustedHour >= 12 ? "PM" : "AM";
        const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
        times.push({ time: formattedTime, checked: false });
      }
    }
    return times;
  };

  const handleOk = () => {
    const selectedTimesForDate = modalTimes
      .filter((time) => time.checked)
      .map((time) => time.time);
    onSelectTime(selectedTimesForDate);
    setModalOpen(false);
    setIsModalVisible(false);
    setModalTimes(modalTimes.map((time) => ({ ...time, checked: false })));
  };

  const showModal = (date: Dayjs) => {
    const timesForSelectedDate = selectedTimes[date.format("DDMMYY")] || [];
    const preCheckedTimes = modalTimes.map((modalTime) => ({
      ...modalTime,
      checked: timesForSelectedDate.includes(modalTime.time),
    }));

    setModalTimes(preCheckedTimes);
    setSelectedDate(date);
    setIsModalVisible(true);
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
    setIsModalVisible(false);
  };

  const dateCellRender = (value: Dayjs) => {
    const data = selectedTimes
      ? selectedTimes[value.format("DDMMYY")] || []
      : [];

    return (
      <ul className="events">
        {data?.map((item: any, index: any) => (
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
    <div className="flex justify-center items-center lg:h-[88vh] pt-5 rounded-md">
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
          <ul className="grid grid-cols-4 mb-5 mt-2">
            {modalTimes.map((timeData) => (
              <li key={timeData.time} className="py-1 mx-auto">
                <label
                  className={`flex w-20 justify-center border-2 px-2 py-[2px] rounded ${
                    timeData.checked
                      ? "border-[#7c3aed] bg-[#7c3aed] text-white text-bold"
                      : "border-[#7c3aed]"
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
      </Modal>
    </div>
  );
};

export default CalendarPage;
