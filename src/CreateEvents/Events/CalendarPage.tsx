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
    const currentDateKey = selectedDate?.format("DDMMYY");

    if (currentDateKey) {
      setSelectedTimes((prevSelectedTimes: { [x: string]: any }) => {
        const isSelected = prevSelectedTimes[currentDateKey]?.includes(time);

        return {
          ...prevSelectedTimes,
          [currentDateKey]: isSelected
            ? (prevSelectedTimes[currentDateKey] || []).filter(
                (selectedTime: string) => selectedTime !== time
              )
            : [...(prevSelectedTimes[currentDateKey] || []), time],
        };
      });
    }
  };

  const generateTimes = (
    startHour: number,
    endHour: number,
    eventDuration: number
  ) => {
    const times: { time: string; checked: boolean }[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += eventDuration) {
        const formattedTime = `${hour % 12 || 12}:${
          minute === 0 ? "00" : minute
        } ${hour >= 12 ? "PM" : "AM"}`;
        times.push({ time: formattedTime, checked: false });
      }
    }
    return times;
  };

  const handleOk = () => {
    const dateKey = selectedDate?.format("DDMMYY");
    const timesForSelectedDate =
      (selectedTimes && selectedTimes[dateKey || ""]) || [];
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
    console.log(times);
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
                <label className="flex w-20 justify-center border-2 border-[#7c3aed] px-2 py-[2px] rounded">
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
            <h3 className="font-semibold text-md mb-3">Selected Times:</h3>
            <ul className="grid grid-cols-5 gap-2">
              {selectedTimes &&
                selectedTimes[selectedDate?.format("DDMMYY") || ""]?.map(
                  (selectedTime: any) => (
                    <li
                      className="w-20 px-2 py-[2px] border-2 border-[#7c3aed] text-center rounded"
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
