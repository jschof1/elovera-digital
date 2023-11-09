import React, { useState, useEffect } from 'react';
import Popup from 'react-animated-popup';
import Youtube from 'react-youtube';
import { motion } from 'framer-motion';

// Define a type for the item in the data array
type GridItem = {
    id: number;
    title: string;
    content: string;
};

export default function HubGrid() {

    const gridItemVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
        hover: { scale: 1.05 }
    };
    const popupVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
    };

    // Use TypeScript's generic to define the state's type
    const [data, setData] = useState<GridItem[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [popupContent, setPopupContent] = useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const fakeData: GridItem[] = new Array(10).fill(null).map((_, index) => ({
                id: index,
                title: `Item ${index + 1}`,
                content: 'XPrENGpf81I',
            }));
            setData(fakeData);
        };

        fetchData();
    }, []);

    const handleClick = (index: number) => {
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

    // Define a type for the style object
    const popupStyle: React.CSSProperties = {
        width: '80%',
        height: '80%',
        maxWidth: 'none',
        maxHeight: 'none',
        margin: '0 auto',
        transform: 'translateY(-50%)',
        top: '50%',
        left: '0',
        right: '0',
        position: 'fixed',
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
            <div className="flex space-x-7 justify-center mb-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg">
                    Music
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg">
                    Events
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-lg">
                    Mixes
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-lg">
                    Videos
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
                {data.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="p-4 border cursor-pointer bg-white"
                        onClick={() => handleClick(index)}
                        variants={gridItemVariants}
                        whileHover="hover"
                    >
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <div className="video-container">
                             <div className="video-foreground">
                        <Youtube videoId={item.content} opts={videoOpts} />
                    </div>
                    </div>
                    </motion.div>
                ))}
            </div>
            <Popup visible={isPopupVisible} style={popupStyle} onClose={() => setIsPopupVisible(false)}>
                
                <motion.div className="p-4"
                    variants={popupVariants}
                    initial="hidden"
                    animate={isPopupVisible ? "visible" : "hidden"}
                >
                    <h3 className="text-lg font-semibold">Details</h3>
                    <Youtube videoId={popupContent} opts={videoOpts} />
                </motion.div>
            </Popup>
        </div>
    );
}
