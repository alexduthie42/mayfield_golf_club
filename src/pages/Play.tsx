import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'

export default function Play() {
  return (
    <div>
      <p>play</p>
      <img src={background} className='background'/>
    </div>
  );
}
