'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
    const [isClient, setIsClient] = useState(false);

    const videoStyle = {
        position: 'fixed', // Use fixed or absolute depending on your use case
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1, // Ensures the video stays in the background
    };
    useEffect(() => {
        // Set isClient to true once the component has mounted
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>; // or any other placeholder
    }
    return (
        <>
            <div style={{ width: '100%', height: '100%', position: 'fixed'}}>
                <video autoPlay loop muted style={videoStyle}>
                    <source
                        src="https://elovera.my.canva.site/your-paragraph-text/videos/fb6e4467e7053efb0979ec228db7d7e1.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
        <div className="p-5 text-white z-20">
            <h1 className="text-2xl pb-3 border-white border-b-4 font-thin">ELOVERA</h1>
            <div className="border-b-4 border-white">
                <div className="text-9xl font-bold mt-8 mb-40 animate-left-slideIn text-shadow-lg">
                    A <motion.span  whileHover={{ scale: 1.1 }} >CREATIVE </motion.span> SPACE,
                </div>
                {/* crate a conatiner so that the text is on the right */}
                <div className="">
                <div className="">
                    </div>
                            <div className="bg-primary rounded-sm bg-opacity-60 backdrop-blur-xl shadow-2xl font-thin ml-[66rem]">
                                <div className="p-5 transition ease-out duration-700">
                        Elovera is a cultural hub tailor made for you, where you can find music, events, as well as learn all in one space. Everyone’s experience on Elovera is unique and shaped by their personal preferences ensuring that you are able to find more of what you love.
                        </div>
                    </div>
                </div>
                <div className="text-9xl font-bold text-right mb-14 animate-right-slideIn">
                    JUST FOR
                   <motion.div
  drag
    whileHover={{ scale: 1.1 }}
  dragElastic={0.2}
  className="inline-flex ml-9">
                    YOU
                    </motion.div>
                </div>
            </div>
            <div className="flex text-white">
                <div className="text-2xl border-r-4 font-thin border-white flex-1 p-6">
                    PARTY - READ - WATCH - LISTEN - SHARE
                </div>
                <div className="text-2xl flex-1 font-thin text-right p-6">
                    LISTENING IS THE ANSWER
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
