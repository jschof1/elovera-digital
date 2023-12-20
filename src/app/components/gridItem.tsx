import React, {useState, useEffect} from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import HeartIcon from './heartIcon';
import HubFetch from './hubFetch'; // Import HubFetch component
import GridPlaceholder from './gridPlaceholder';
// {//codesandbox.io/p/sandbox/floating-ui-framer-motion-tooltip-1d9mf4 or https://ned.im/react-useoverlay/ - use to add a buy now or here button }


const boxVariants = {
    out: {
        y: 300,
        transition: {
            duration: 0.6,
            ease: "easeInOut", // Apply ease-in-out here
        },
    },
    in: {
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut", // Apply ease-in-out here
            delayChildren: 1.2,
        },
    },
};

const cardVariants: Variants = {
    offscreen: {
        y: 300
    },
    onscreen: {
        y: 50,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2,
        }
    }
}; 
const GridItem = ({ item, favorites, toggleFavorite, onItemClick, index }) => {
    const isFavorite = favorites[item.id];
    const [styleOnHover, setStyleOnHover] = useState({});
    const [itemStyle, setItemStyle] = useState({});
    const [displayNone, setDisplayNone] = useState(false);

    // on hover display none
    const onTMouseEnter = () => setDisplayNone(true);

    if (index % 3 !== 0) {
        return <GridPlaceholder />;
    }
    const stripedBackground = {
        zIndex: 1,
        position: 'absolute',
        background: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2) 2px, rgb(0, 0, 0, 0.2) 2px, rgb(0, 0, 0) 3px)'
    };

    // Function to remove the background on hover
    const onMouseEnter = () => setStyleOnHover({ transition: 'background 0.3s ease',});

    // Function to generate a random position within the container
    const getRandomMargin = () => {
        const maxMargin = 100; // Max number of pixels to offset by
        const marginTopBottom = Math.floor(Math.random() * maxMargin) - (maxMargin / 3);
        return marginTopBottom;
    }

    // useEffect(() => {
    //     const randomMarginTopBottom = getRandomMargin();
    //     setItemStyle({
    //         marginTop: `${randomMarginTopBottom}px`,
    //         marginBottom: `${randomMarginTopBottom}px`,
    //         // You can add other styles if needed
    //     });
    // }, []); // Empty dependency array ensures this runs only once

    // // ... rest of the component ...

    return (  
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            animate={{
                scale: [1, 1.02, 1, 1.01, 1],  // Subtle scaling effect
                borderRadius: ["0%", "0%", "50%", "50%", "0%"]  // Keeping the borderRadius animation as it is
            }}
            transition={{
                duration: 9,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
            }}
        >
            <motion.div
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                
            style={itemStyle}
            variants={cardVariants}
                className="relative overflow-hidden mx-5 rounded-lg shadow-xl shadow-green-600"
            >
          
                <div className="absolute top-0 right-0 p-2 z-10">
                    <HeartIcon
                        isFavorite={isFavorite}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the grid item click event
                            toggleFavorite(item.id);
                        }}
                    />
                </div>
                <HubFetch item={item} />
                <div 
                    className="bottom-0 left-0 w-full h-full text-white text-xl font-light text-center rounded-b-lg"
                    style={{ ...stripedBackground, ...styleOnHover }} 
                    onMouseEnter={onMouseEnter}
                >
                    {/* <div className="absolute top-0 right-0 m-6 rotate-45 bg-primary text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                        {item.type}
                    </div> */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full px-3 py-1" style={{ width: '5vw', height: '5vw' }}>
                    <Image
                        width={90}  // Responsive width based on viewport width
                        height={90}
                        src="/walking-logo-white.gif"
                        alt="Left Image"
                    ></Image>
                    </div>
                    <div className="absolute flex text-base top-0 bg-black w-full py-3 px-4 justify-start">
                    {item.title} 
                    </div>
                </div>
            </motion.div>
            </motion.div>
    );
};

export default GridItem;


