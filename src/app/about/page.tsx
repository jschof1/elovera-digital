'use client'
import { motion } from 'framer-motion';
import Image from 'next/image'
import Navbar from '../components/navBar';

export default function About() {
    return (
        <div className="p-5 bg-amber-50">
            <h1 className="text-2xl pb-3 border-black border-b-4 font-thin">ELOVERA</h1>
            <div className="border-b-4 border-black">
                <div className="text-9xl font-bold mt-8 mb-40 animate-left-slideIn">
                    A <motion.span  whileHover={{ scale: 1.1 }} >CREATIVE </motion.span> SPACE,
                </div>
                {/* crate a conatiner so that the text is on the right */}
                <div className="">
                <div className="">
                    </div>
                <div className="text-right pl-[66rem]">
                        Elovera is a cultural hub tailor made for you, where you can find music, events, as well as learn all in one space. Everyone’s experience on Elovera is unique and shaped by their personal preferences ensuring that you are able to find more of what you love.
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
            <div className="flex -mx-5">
                <div className="text-2xl border-r-4 font-thin border-black flex-1 p-6 pt-8">
                    PARTY - READ - WATCH - LISTEN - SHARE
                </div>
                <div className="text-2xl flex-1 font-thin text-right p-6 pt-8">
                    LISTENING IS THE ANSWER
                </div>
            </div>
        </div>
    );
}
