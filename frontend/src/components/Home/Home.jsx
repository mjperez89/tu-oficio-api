import React, {useEffect} from 'react'
import scrollreveal from "scrollreveal";
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { Navbar } from '../Navbar/Navbar';
import { Hero } from '../Hero/Hero';
import { Categories } from '../Categories/Categories';
import { Recommend } from '../Recommend/Recommend';
import { Testimonials } from '../Testimonials/Testimonials';
import { Footer } from '../Footer/Footer';
export const Home = () => {

  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
        nav,
        #hero,
        #categories,
        #recommend,
        #testimonials,
        #footer
        `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  return (
    <div>
      <ScrollToTop/>
      <Navbar/>
      <Hero/>
      <Categories/>
      <Recommend/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

{/* <ScrollToTop />
      <Navbar />
      <Hero />
      <Categories />
      <Recommend />
      <Testimonials />
      <Footer /> */}