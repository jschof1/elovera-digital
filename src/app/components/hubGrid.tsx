import React, { useState, useEffect } from 'react';
import Popup from 'react-animated-popup';
import Youtube from 'react-youtube';
import { motion } from 'framer-motion';
import Image from 'next/image';

type GridItem = {
    id: number;
    title: string;
    content: string;
    colSpan: number;
    rowSpan: number;
};


const gridItemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05 }
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



export default function HubGrid() {
    const [data, setData] = useState<GridItem[]>([]);
    const [popupContent, setPopupContent] = useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [numOfCols, setNumOfCols] = useState(8);
    const [dimensions, setDimensions] = useState({ width: 70, height: 70 });



    const randomizeColumns = () => {
        // Assuming you want between 2 to 4 columns
        const randomCols = Math.ceil(Math.random() * (4 - 2 + 1)) + 2;
        setNumOfCols(randomCols);
    };

    const getRandomSize = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

    useEffect(() => {
        randomizeColumns();
        const fetchData = async () => {
            const fakeData: GridItem[] = Array.from({ length: 10 }, (_, index) => ({
                id: index,
                title: `Item`,
                content: 'XPrENGpf81I',
                 colSpan: Math.ceil(Math.random() * 3), // Random column span from 1 to 3
                rowSpan: Math.ceil(Math.random() * 3), // Random row span from 1 to 3
            }));
            setData(fakeData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setDimensions({
            width: getRandomSize(50, 50),
            height: getRandomSize(500, 700)
        });
    }, []); // Empty dependency array ensures this runs once on mount


    const togglePopup = (content: string) => {
        setIsPopupVisible(!isPopupVisible);
        setPopupContent(isPopupVisible ? '' : content);
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

            <div className="grid gap-4 w-full h-full"
                style={{
                    gridTemplateColumns: `repeat(${numOfCols}, minmax(0, 1fr))`
                }}
            >
                    {data.map((item) => {
                        const dynamicWidth = getRandomSize(50, 100); // Set your desired min and max width
                        const dynamicHeight = getRandomSize(100, 500); 
                    
                        return (
                        <motion.div
                            key={item.id}
                            className={`p-4 m-8 border cursor-pointer bg-white shadow-2xl rounded col-span-${item.colSpan} row-span-${item.rowSpan}`}
                            style={{
                                gridColumn: `span ${item.colSpan}`,
                                gridRow: `span ${item.rowSpan}`,
                            }}
                            onClick={() => togglePopup(item.content)}
                            variants={gridItemVariants}
                            whileHover="hover"
                        >
                            <Image
                                src="/walking-logo-black.gif"
                                    width={dynamicWidth}
                                    height={dynamicHeight}
                                alt="logo"
                            />
                            
                </motion.div>
                );
                })}
            </div>
            {isPopupVisible && (
                <Popup visible={true} style={{
                    width: '80%', height: '80%', maxWidth: 'none', maxHeight: 'none',
                    margin: '0 auto', transform: 'translateY(-50%)', top: '50%',
                    left: '0', right: '0', position: 'fixed'
                }} onClose={() => setIsPopupVisible(false)}>
                    <motion.div className="p-4" variants={gridItemVariants}>
                        <h3 className="text-lg font-semibold">Details</h3>
                        <Youtube videoId={popupContent} opts={videoOpts} />
                    </motion.div>
                </Popup>
            )}
        </div>
    );
}
