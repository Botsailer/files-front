import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './resizableComponent.css';

const ResizableComponent = ({Pwidth = '50vw', Pheight = '80vh', cornerSize = '100px', centerSize = 1,child, title }) => {
    const SL_Ref = useRef(null);


    const onPageLoad = () => {
        const element = SL_Ref.current;
        const tl = gsap.timeline();
        tl.fromTo(element, {height: 0, width: "0px"},{height: 0, width:Pwidth, duration:0.2})
        tl.fromTo(element, {height: 0, width: Pwidth}, {height: Pheight, width:Pwidth, duration:0.3})
    }

    useEffect(() => {  
        onPageLoad();
    }, [])

    const cornerStyle = {
        position: 'absolute',
        width: cornerSize,
        height: cornerSize,
        backgroundImage: `url(SL_corner.svg)`,
        backgroundSize: 'cover',
        filter: "drop-shadow(0 0 10px rgba(0, 0, 139, 1)) invert(42%) sepia(93%) saturate(1000%) hue-rotate(155deg) brightness(119%) contrast(119%)",
      };

  return (
    <div className='SL_container'
        ref={SL_Ref}
      style={{
        position: 'relative',
        width: Pwidth,
        height: Pheight,
        background: 'rgba(0, 140, 200, 0.6)',
        boxShadow: "0 0 50px 15px rgba(0, 121, 165, 1)",
        overflow: 'auto',
      }}
    >
    <div style={{ ...cornerStyle, top: 0, left: 0, transform: 'scale(-1)'}} />
    <div style={{ ...cornerStyle, top: 0, right: 0, transform: 'scaleY(-1)'}} />
    <div style={{ ...cornerStyle, bottom: 0, left: 0, transform: 'scaleX(-1)'}} />
    <div style={{ ...cornerStyle, bottom: 0, right: 0 }} />
    <div className=' h-full w-full p-5 flex flex-col'>
      <div className=' w-full h-fit'>
        <div className='flex justify-center'><img src='SL_title.svg' alt='titledraw' className=' centerDesign' style={{height: 56 * centerSize, width: 140 * centerSize, filter: "drop-shadow(0 0 10px rgba(0, 0, 139, 1)) invert(42%) sepia(93%) saturate(1000%) hue-rotate(155deg) brightness(119%) contrast(119%)",}}/></div>
        <div className=' border-t-1 border-b-1 text-center bg-grad gradient-border'>
          {title}</div>
      </div>
      <div className='overflow-y-scroll h-auto no-scrollbar  items-center '>
      {child}
      </div>
    </div>
    </div>
  );
  
};



export default ResizableComponent;