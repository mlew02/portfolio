import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const Background = () => {
  const containerRef = useRef(null);
  const ballsRef = useRef([]);

  const colors = ['white'];

  const generateRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  
  const createBall = (index) => {
    const size = 5 + Math.random() * 5;  
    return {
      id: index,
      color: generateRandomColor(),
      size,
      xVelocity: 0.05 + Math.random() * 0.05,  
      yVelocity: 0.05 + Math.random() * 0.05,  
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
  };

  const balls = Array.from({ length: 10 }, (_, i) => createBall(i));

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const animate = () => {
      balls.forEach((ball, i) => {
        let { x, y, xVelocity, yVelocity, color } = ball;

        if (x <= 0 || x >= containerWidth - ball.size) {
          xVelocity = -xVelocity;
          color = generateRandomColor();
        }

        if (y <= 0 || y >= containerHeight - ball.size) {
          yVelocity = -yVelocity;
          color = generateRandomColor();
        }

        x += xVelocity;
        y += yVelocity;

        const ballElement = ballsRef.current[i];
        if (ballElement) {
          ballElement.style.left = `${x}px`;
          ballElement.style.top = `${y}px`;
          ballElement.style.backgroundColor = color;
        }

        ball.x = x;
        ball.y = y;
        ball.xVelocity = xVelocity;
        ball.yVelocity = yVelocity;
        ball.color = color;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#133A53'
      }}
    >
      {balls.map((ball, i) => (
        <div
          key={ball.id}
          ref={(el) => (ballsRef.current[i] = el)}
          style={{
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            borderRadius: '50%',
            position: 'absolute',
            left: `${ball.x}px`,
            top: `${ball.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Background;