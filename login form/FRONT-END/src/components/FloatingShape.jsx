import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ color, size, top, left, delay }) => {
    const floatAnimation = {
        y: ["0%", "100%", "0%"],  
        x: ["0%", "100%", "0%"],  
        rotate: [0, 360],         
        transition: {
          duration: 20,           
          repeat: Infinity,       
          repeatType: "loop",     
          ease: "linear",         
          delay: delay,           
        },
        
      };
      


  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} blur-lg opacity-20`}
      style={{ top: top, left: left }} styles
      animate={floatAnimation} aria-hidden='true'
    />
  );
};

export default FloatingShape;
