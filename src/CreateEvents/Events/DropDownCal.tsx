import { Button, Dropdown, Menu } from "antd";
import { useState } from "react";

interface DropDownCalProps {
  onSelectTime: (time: string) => void;
}

const DropDownCal: React.FC<DropDownCalProps> = ({ onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  const handleMenuClick = (e: { key: string }) => {
    const selectedTime = e.key;
    setSelectedTime(selectedTime);
    onSelectTime(selectedTime);
  };

  const formatTimeWithAMPM = (hours: number, minutes: number): string => {
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes === 0 ? "00" : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const generateMenuItems = () => {
    const startTime = 9 * 60;
    const endTime = 16 * 60 + 30;
    const breakInterval = 30;

    const menuItems = [];

    for (let time = startTime; time <= endTime; time += breakInterval) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      const formattedTime = formatTimeWithAMPM(hours, minutes);

      const menuItem = (
        <Menu.Item key={formattedTime}>
          <a target="_blank" rel="noopener noreferrer">
            {formattedTime}
          </a>
        </Menu.Item>
      );

      menuItems.push(menuItem);
    }

    return menuItems;
  };

  const menu = <Menu onClick={handleMenuClick}>{generateMenuItems()}</Menu>;

  return (
    <div>
      <Dropdown className="w-full" overlay={menu} placement="bottom" arrow>
        <Button className="font-semibold">
          {selectedTime ? `Selected Time: ${selectedTime}` : "Select Time"}
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropDownCal;
