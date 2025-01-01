import React from 'react';
import './../App.css';
import Home from './../pages/Home';
import Contact from './../pages/Contact';
import Play from './../pages/Play';
import Schedule from './../pages/Schedule';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { ChakraProvider } from '@chakra-ui/react'

export default function Main() {

  const [page, setPage] = React.useState('home')
  const pages: { [id: string] : JSX.Element } = {
      "home": <Home/>,
      "contact": <Contact/>,
      "play": <Play/>,
      "schedule": <Schedule/>
  }

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  return (
    <div>
      <PageHeader page={page} setPage={setPage} dimensions={dimensions} />
      <div className='content'>
          {pages[page]}
      </div>
      <PageFooter dimensions={dimensions}/>
    </div>
  );
}