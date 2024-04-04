import React, { useEffect,useRef,useState } from 'react'
import Styles  from './land.module.css'
import { Link } from 'react-router-dom';
import TypewriterComponent from "typewriter-effect";
import Animationz from '../anim/Animation.js'
import Features from  "./services.jsx"
import { BiFontSize } from 'react-icons/bi';
function Landing() {
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 0);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const textRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        let value = window.scrollY;
        textRef.current.style.transform = `translateX(${-value * 2}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div id={Styles.body}>
      <header className={`${Styles.header} ${isSticky ? Styles.sticky : ''}`}>
      <a href={`#${Styles.body}`} className={Styles.logo}>File-Utils</a>
      <ul className={Styles.menu}>
        <li><a href='#'>About</a></li>
        <li><a href={`#services`}>Services</a></li>
        {!sessionStorage.getItem('user') && <li><a href='/login'>Login</a></li>}
      </ul>
    </header>
    <section className={Styles.paralax}>
  <h1 ref={textRef} id={Styles.text}>
    Welcome To Our Website!
    <br/>
    <div className=' text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-green-300 text-5xl'  > 
    <TypewriterComponent 
                options={
                    {
                        
                        strings: ["FAST & Secure!", "ADVANCED TECHNOLOGY", "Peer 2 Peer", "Temp upload","Permanent Upload"],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 20,
                    }
                }
                /></div>
    </h1>
  
  <img src="grass2.png" alt="" />
</section>
    <section id="services" className={Styles.sec}>
   
    <Features/>
    </section> 
   <section>
     <div style={{zIndex:"1000", backgroundColor:"white"}}>
     <Animationz/>

     </div>
   </section>
    </div>
    </>
  )
}

export default Landing