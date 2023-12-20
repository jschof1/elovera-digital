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
                    THIS SPACE,
                </div>
                {/* crate a conatiner so that the text is on the right */}
                <div className="">
                <div className="">
                    </div>
                <div className="text-right pl-[72rem]">
                    Your space is Elovera. This is a place where you can find the music love, buy the you clothes you need and share all of your passions with like-minded individuals.
                    </div>
                </div>
                <div className="text-9xl font-bold text-right mb-14 animate-right-slideIn">
                    IS YOUR 
                   <motion.div
  drag
  dragElastic={0.2}
  className="inline-flex ml-9">
                    PLACE
                    </motion.div>
                </div>
            </div>
            <div className="flex -mx-5">
                <div className="text-2xl border-r-4 font-thin border-black flex-1 p-5">
                    PARTY - READ - WATCH - LISTEN - SHARE - UNIFY
                </div>
                <div className="text-2xl flex-1 font-thin text-right p-5">
                    LISTENING IS THE ANSWER
                </div>
            </div>
        </div>
    );
}
