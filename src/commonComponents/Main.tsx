import React from 'react';
import './../App.css';
import Home from './../pages/Home';
import Contact from './../pages/Contact';
import Schedule from './../pages/Schedule';
import Course from './../pages/Course';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default function Main() {
  const [page, setPage] = React.useState('home')
  const pages: { [id: string] : JSX.Element } = {
      "home": <Home/>,
      "course": <Course/>,
      "schedule": <Schedule/>,
      "contact": <Contact/>
  }

  return (
    <div>
      <div className='pageHeader'>
        <PageHeader page={page} setPage={setPage} />
      </div>
      <div className='content'>
          {pages[page]}
      </div>
      <PageFooter/>
    </div>
  );
}