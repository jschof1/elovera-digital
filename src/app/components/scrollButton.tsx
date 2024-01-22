import React, { useState } from 'react';

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(true);

    const scrollToBottom = () => {
        // Scrolls to the bottom of the page
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth' // For smooth scrolling
        });
        // Hide the button after clicking
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50">
            <button
                className="font-bold pb-10 text-white md:text-lg"
                onClick={scrollToBottom}
            >
                scroll
            </button>
            <p className="h-6 text-2xl text-white">
                <svg
                    viewBox="0 0 16.0 31.347603289849417"
                    preserveAspectRatio="none"
                    className="block w-full h-full overflow-visible opacity-100 min-h-1 cursor-pointer"
                    style={{
                        stroke: "#ffffff",
                        fill: "#ffffff",
                        background: "url('data:image/png;base64,')" // Replace with your actual background image
                    }}
                >
                    <g>
                        <path
                            d="M8.000000000000114,0.0 L8.000000000000114,20.347603289849417"
                            style={{ fill: "none", strokeWidth: "4px", strokeLinecap: "butt" }}
                        />
                        <path
                            d="M14.0,21.347603289849303 L8.0,29.347603289849303 L2.0,21.347603289849307 Z"
                            style={{ strokeLinejoin: "round", strokeLinecap: "round", strokeWidth: "4px", fill: "inherit" }}
                        />
                    </g>
                </svg>
            </p>
        </div>
    );
};

export default ScrollButton;