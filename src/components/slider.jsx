import React, { useEffect, useState } from 'react';

const SliderComponent = ({ restData, currentIndex }) => {
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const startSlider = () => {
            const id = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % restData.length);
            }, 5000);
            setIntervalId(id);
        };

        startSlider();

        return () => clearInterval(intervalId);
    }, [restData]);

    const handleMouseEnter = () => {
        clearInterval(intervalId); // Pause slider when mouse enters
    };

    const handleMouseLeave = () => {
        startSlider(); // Resume slider when mouse leaves
    };

    return (
        <div className="slider-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* Your slider content rendering here */}
            <p>Current Index: {currentIndex}</p>
        </div>
    );
};

export default SliderComponent;