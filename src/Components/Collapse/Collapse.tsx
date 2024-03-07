import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';


const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <p className='text-xl font-semibold'>How does TimeForge simplify the event creation process?</p>,
    children: <p className='italic font-medium'>TimeForge is designed to provide users with a seamless and user-friendly interface, making event creation effortless. Users can quickly create online and offline events with just a few clicks.</p>,
  },
  {
    key: '2',
    label:  <p className='text-xl font-semibold'>Can I categorize different types of events on TimeForge?</p>,
    children: <p className='italic font-medium'>Yes, TimeForge allows users to categorize events based on their nature, whether it's a ceremony, interview, formal meeting, informal gathering, or even a gaming session. This feature enhances organization and filtering capabilities.</p>,
  },
  {
    key: '3',
    label: <p className='text-xl font-semibold'>What options does TimeForge offer for managing participants in events?</p>,
    children: <p className='italic font-medium'>TimeForge provides a comprehensive set of features to manage participants, including the ability to select the necessity of video and audio, ensuring a tailored experience for each meeting.</p>,
  },
  {
    key: '4',
    label: <p className='text-xl font-semibold'>How does TimeForge help users save and manage time effectively?</p>,
    children: <p className='italic font-medium'>TimeForge is specifically designed to assist users in saving and managing time effortlessly. Features such as calendar integration, time zone support, and customizable profiles contribute to a streamlined and efficient scheduling process.</p>,
  },
];

const Accordion: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default Accordion;