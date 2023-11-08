import React, { useState, useEffect } from 'react';
import Popup from 'react-animated-popup';
import Youtube from 'react-youtube';

export default function HubGrid() {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [popupContent, setPopupContent] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const fakeData = new Array(10).fill(null).map((_, index) => ({
                id: index,
                title: `Item ${index + 1}`,
                content: 'XPrENGpf81I',
            }));
            setData(fakeData);
        };

        fetchData();
    }, []);

    const handleClick = (index) => {
        // Toggle popup visibility and set content
        if (activeIndex === index) {
            // Close popup if the same item is clicked
            setActiveIndex(null);
            setIsPopupVisible(false);
        } else {
            setActiveIndex(index);
            setPopupContent(data[index].content);
            setIsPopupVisible(true);
        }
    };

    const popupStyle = {
        width: '80%', // Adjust width as needed
        height: '80%', // Adjust height as needed
        maxWidth: 'none', // This prevents the popup from being too small on larger screens
        maxHeight: 'none', // This prevents the popup from being too small on larger screens
        margin: '0 auto', // This will horizontally center the popup
        transform: 'translateY(-50%)', // This will vertically center the popup
        top: '50%', // Works with transform to center vertically
        left: '0', // Aligns with the left edge of the screen
        right: '0', // Aligns with the right edge of the screen
        position: 'fixed', // This makes the popup stay in place even when scrolling
    };

    const videoOpts = {
        playerVars: {
            autoplay: 0,
            modestbranding: 0,
            controls: 0,
            rel: 0,
            showinfo: 0,
        },
    };

    return (
        <div className="p-5 w-full min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
                {data.map((item, index) => (
                    <div
                        key={item.id}
                        className="p-4 border rounded-lg cursor-pointer bg-white"
                        onClick={() => handleClick(index)}
                    >
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <div className="video-container">
                             <div className="video-foreground">
                        <Youtube videoId={item.content} opts={videoOpts} />
                    </div>
                    </div>
                    </div>
                ))}
            </div>
            <Popup visible={isPopupVisible} style={popupStyle} onClose={() => setIsPopupVisible(false)}>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Details</h3>
                    <Youtube videoId={popupContent} opts={videoOpts} />
                </div>
            </Popup>
        </div>
    );
}
