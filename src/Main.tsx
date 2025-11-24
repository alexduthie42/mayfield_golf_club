import React from 'react';
import './App.css';
import { AnimatePresence, motion } from "motion/react"
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Schedule from './Pages/Schedule/Schedule';
import Course from './Pages/Course/Course';
import PageHeader from './CommonComponents/PageHeader';
import PageFooter from './CommonComponents/PageFooter';

export default function Main() {

  // const pageOrder = ['home', 'course', 'schedule', 'contact'];
  const pageOrder = ['home', 'course', 'schedule'];

  const [page, setPage] = React.useState('home')
  const [prevPage, setPrevPage] = React.useState('home');

  const pages: { [id: string] : JSX.Element } = {
      "home": <Home/>,
      "course": <Course/>,
      "schedule": <Schedule/>,
      // "contact": <Contact/>
  }

  const handlePageChange = (newPage: string) => {
    setPrevPage(page);
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  };

  const currentIndex = pageOrder.indexOf(page);
  const prevIndex = pageOrder.indexOf(prevPage);
  const direction = currentIndex > prevIndex ? 1 : -1;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0
      };
    }
  };

  return (
    <div>
      <div className='pageHeader'>
        <PageHeader page={page} setPage={handlePageChange} />
      </div>
      <div className='content'>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                 x: { type: "tween", stiffness: 300, damping: 30, duration: 0.5}
              }}
            >
              {pages[page]}
          </motion.div>
        </AnimatePresence>
      </div>
      <PageFooter/>
    </div>
  );
}