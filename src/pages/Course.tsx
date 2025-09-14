import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/CourseMap.png'
import { Button, IconButton } from '@chakra-ui/react';
import HoleButton from '../commonComponents/HoleButton';

export default function Course() {
  return (
    <div className="courseMapContainer">
      <img src={background} className='background'/>
      <HoleButton top="40%" left="67.5%" transform="translate(-50%, -50%)" label="1"/>
      <HoleButton top="8%" left="63%" transform="translate(-50%, -50%)" label="2"/>
      <HoleButton top="35%" left="58.5%" transform="translate(-50%, -50%)" label="3"/>
      <HoleButton top="20%" left="41%" transform="translate(-50%, -50%)" label="4"/>
      <HoleButton top="3.4%" left="27%" transform="translate(-50%, -50%)" label="5"/>
      <HoleButton top="30%" left="36%" transform="translate(-50%, -50%)" label="6"/>
      <HoleButton top="75%" left="57%" transform="translate(-50%, -50%)" label="7"/>
      <HoleButton top="65%" left="38%" transform="translate(-50%, -50%)" label="8"/>
      <HoleButton top="68%" left="67%" transform="translate(-50%, -50%)" label="9"/>
    </div>
  );
}
