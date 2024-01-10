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
                <div className="text-white z-20 pt-24">
                    <div className="text-2xl pb-3 border-white border-b-4 font-thin">
                        <h1 className='ml-4'>ELOVERA </h1>
                        </div>
                    <div className="border-b-4 border-white">
                        <div className="my-10 mx-4">
                        <div className="text-9xl font-bold mb-36 animate-left-slideIn text-shadow-lg">
                            A <motion.span whileHover={{ scale: 1.5 }} >CREATIVE </motion.span> SPACE,
                        </div>
                        {/* crate a conatiner so that the text is on the right */}
                            <div className="bg-primary bg-opacity-60 backdrop-blur-xl shadow-2xl mb-5 font-thin ml-[66rem] rounded-lg">
                                <div className="p-5 transition ease-out duration-700">
                                    Elovera is a cultural hub tailor made for you, where you can find music, events, as well as learn all in one space. Everyone’s experience on Elovera is unique and shaped by their personal preferences ensuring that you are able to find more of what you love.
                                </div>
                            </div>
                        <div className="pb-3">
                            <div className="text-9xl font-bold text-right animate-right-slideIn">
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
                    </div>
                    </div>
                    <div className="flex text-white">
                        <div className="text-2xl border-r-4 font-thin border-white flex-1 py-4 px-5">
                            PARTY - READ - WATCH - LISTEN - SHARE
                        </div>
                        <div className="text-2xl flex-1 font-thin text-right py-4 px-5">
                            LISTENING IS THE ANSWER
                        </div>
                    </div>
                </div>
        </>
    );
}
