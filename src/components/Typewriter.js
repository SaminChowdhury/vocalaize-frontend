import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50 }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setContent((prevContent) => {
        if (index === text.length) {
          clearInterval(timer); // Clear interval when all characters are typed
          return prevContent;
        }
        return prevContent + text.charAt(index);
      });
      index++;
    }, speed);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [text, speed]);

  return <>{content}</>;
};

export default Typewriter;
