import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'

export default function Home() {
  return (
    <div>
      <p>home</p>
      <img src={background} className='background'/>
    </div>
  );
}
