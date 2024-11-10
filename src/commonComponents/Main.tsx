import React from 'react';
import './../App.css';
import Home from './../pages/Home';
import Contact from './../pages/Contact';
import Play from './../pages/Play';
import Schedule from './../pages/Schedule';
import PageHeader from './PageHeader';
import { ChakraProvider } from '@chakra-ui/react'

export default function Main() {

  const [page, setPage] = React.useState('home')
  const pages: { [id: string] : JSX.Element } = {
      "home": <Home/>,
      "contact": <Contact/>,
      "play": <Play/>,
      "schedule": <Schedule/>
  }

  return (
    <div>
      <PageHeader page={page} setPage={setPage} />
      <div className='content'>
          {pages[page]}
      </div>
    </div>
  );
}