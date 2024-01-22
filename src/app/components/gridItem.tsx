import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import HeartIcon from './heartIcon';
import HubFetch from './hubFetch'; // Import HubFetch component
;
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

const findHyphen = (str) => {
    const hyphenIndex = str.indexOf("-");
    return hyphenIndex;
}

const makeBold = (str, hyphenIndex) => {
    const firstPart = str.slice(0, hyphenIndex);
    const secondPart = str.slice(hyphenIndex + 1);
    return (
        <>
            <span className="font-bold">{firstPart} - </span>
             {secondPart}
        </>
    );
};

const makeBoldIfHyphen = (str) => {
    const hyphenIndex = findHyphen(str);
    if (hyphenIndex === -1) return str;
    return makeBold(str, hyphenIndex);
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
const GridItem = ({ item, favorites, toggleFavorite, onItemClick }) => {
    const isFavorite = favorites[item.id];
    const [styleOnHover, setStyleOnHover] = useState({});
    const [itemStyle, setItemStyle] = useState({});
    const [isHovering, setIsHovering] = useState(false);  // Hover state

    // Add the URLs for your still image and GIF here
    const stillImageUrl = '/walking-logo-white-still.png';
    const gifImageUrl = '/walking-logo-white.gif';

    const stripedBackground = {
        zIndex: 1,
        position: 'absolute',
        background: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2) 2px, rgb(0, 0, 0, 0.2) 2px, rgb(0, 0, 0) 3px)'
    };


    const onMouseEnter = () => setStyleOnHover({ transition: 'background 0.3s ease', } );
    
    return (
        <>
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            // animate={{
            //     scale: [1, 1.02, 1, 1.01, 1],  // Subtle scaling effect
            //     borderRadius: ["0%", "0%", "50%", "50%", "0%"]  // Keeping the borderRadius animation as it is
            // }}
            // transition={{
            //     duration: 9,
            //     ease: "easeInOut",
            //     times: [0, 0.2, 0.5, 0.8, 1],
            //     repeat: Infinity,
            // }}
        >
            <motion.div
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}

                style={itemStyle}
                variants={cardVariants}
                className="relative overflow-hidden mx-5 rounded-lg shadow-xl "
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
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
                <HubFetch item={item} height={300} width={375} autoplay={0}/>
                
                <div
                    onClick={() => onItemClick && onItemClick()}
                    className="bottom-0 left-0 w-full h-full text-xl font-light text-center rounded-b-lg"
                    style={{ ...stripedBackground, ...styleOnHover }}
                    onMouseEnter={onMouseEnter}
                >
                    {/* <div className="absolute top-0 right-0 m-6 rotate-45 bg-primary text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                        {item.type}
                    </div> */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full px-3 py-1 pointer-events" style={{ width: '5vw', height: '5vw' }}>
                        <Image
                            width={90}
                            height={90}
                            src={isHovering ? gifImageUrl : stillImageUrl}
                            alt="Left Image"
                        ></Image>
                    </div>
                    <div className="absolute flex text-base top-0 bg-gray-300 w-full py-3 px-4 justify-start  text-gray-700">
                        {/* {item.title} */}
                        {makeBoldIfHyphen(item.title)}
                    </div>
                </div>
            </motion.div>
        </motion.div>
        </>
    );
};

export default GridItem;


