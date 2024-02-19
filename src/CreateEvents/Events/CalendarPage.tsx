import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import { Badge, Button, Calendar, Modal } from "antd";
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
  // console.log("Check event duration: ", eventDuration);
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
    <div className="flex justify-center items-center">
      <Calendar
        className="lg:max-h-full max-h-[500px] lg:m-0 p-5 lg:mb-0 mb-10 rounded-md scroll-smooth lg:overflow-visible overflow-y-auto"
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
