import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './animation.css';


const Animation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [logged, setlogged] = useState(null)
  useEffect(() => {
    setlogged(localStorage.getItem("IsLogged"))
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);



  const calculateMovement = (layer) => {
    const speedFactor = layer === 'back' ? 0.04 : layer === 'mid' ? 0.06 : 0.1;
    const container = containerRef.current;
    if (!container) return {};

    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect.width / 2;
    const containerCenterY = containerRect.height / 2;

    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;

    const distanceX = mouseX - containerCenterX;
    const distanceY = mouseY - containerCenterY;

    const movementX = distanceX * speedFactor;
    const movementY = distanceY * speedFactor;

    return { transform: `translate(${movementX}px, ${movementY}px)` };
  };

  return (
    <>
      <div className="floating-icons-container" ref={containerRef}>
        <div className=" icon back" style={calculateMovement('back')}>
          <img src="bitmap.png" alt="icon1" />
        </div>
        <div className="icon mid" style={calculateMovement('mid')}>
          <img src="bitmap2.png" alt="icon2" />
        </div>
        <div className=" icon front" style={calculateMovement('front')}>
          <img src="bitmap3.png" alt="icon3" />
        </div>
        
        {logged?<>  <button className='button-to-join' onClick={()=>{
          window.location.href="/dashboard"
        }}>
		    <span></span>
		    <span></span>
		    <span></span>
		    <span></span>
		    Continue To Dashboard
	      </button></>:<>
        <button className='button-to-join' onClick={()=>{
          window.location.href="/demo"
        }}>
		    <span></span>
		    <span></span>
		    <span></span>
		    <span></span>
		    Explore Demo
	      </button>
        </>
        }
      </div>
    </>
  );
};

export default Animation;