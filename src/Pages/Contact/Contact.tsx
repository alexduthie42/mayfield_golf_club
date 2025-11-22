import React from 'react';
import './../../App.css';
import TitleImage from './Content/TitleImage.jpg'
import PageTitle from '../../CommonComponents/PageTitle';
import { GoogleApiKey } from '../../CommonComponents/Globals';

export default function Contact() {
  return (
    <div>
      <PageTitle mainText='CONTACT' image={TitleImage}/>
      <iframe src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApiKey}&q=place_id:ChIJmY9zTsG7LW0Rarzprjp9YwY`} />
    </div>
  );
}

//
