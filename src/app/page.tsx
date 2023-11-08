'use client'
import  Navbar from './components/navBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Home() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // Simulate a loading time for page setup tasks or data fetching
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 2000); // Adjust time as needed for your setup

    // Cleanup the timer if the component unmounts before the timer fires
    return () => clearTimeout(timer);
  }, []);


  const centerImageVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 4 // Delay the animation by 0.5 seconds
      }
    },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const leftImageVariants = {
    hidden: { opacity: 0, x: -100 }, // Start 100 pixels to the left of the final position
    visible: { opacity: 1, x: 0, transition: { duration: 3 } },
  };

  const centerImageClassName = "absolute top-[60%] z-10 left-[28%] -translate-x-1/2 -translate-y-1/2 md:top-1/1";
  const leftImageClassName = "absolute bottom-[20%] right-[64%]";

  if (!pageReady) {
    return (
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-screen"
          key="loader"
        >
          <Image src="/loading.gif" alt="Loading" width={800} height={800} />
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <>
      <Navbar />
      <AnimatePresence>
        {!pageReady && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            // your defined variants for loading animation
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-screen"
            key="loader"
          >
            <Image src="/loading.gif" alt="Loading" width={800} height={800} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="isolate bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <video
          autoPlay
          muted
          loop
          id="bgVideo"
          className="z-0 overflow-hidden object-cover min-w-full"
        >
          <source
            width={10}
            height={90}
            src="https://elovera.my.canva.site/your-paragraph-text/videos/fb6e4467e7053efb0979ec228db7d7e1.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>
      <div className="pt-6">
      <motion.div
          className={centerImageClassName}
        initial="hidden"
        animate="visible"
        variants={centerImageVariants} // Use the defined variants
      >
        {/* Centered Image */}
        <Image
          width={700}
          height={700}
          src="https://elovera.my.canva.site/your-paragraph-text/images/513c180505cdae6d658f1092b700074a.png"
          alt="Centered Image"
          ></Image>
      </motion.div>

      <motion.div
        className={leftImageClassName}
        initial="hidden"
        animate="visible"
        variants={leftImageVariants} // Use the defined variants
      >
        <Image
          width={270}
          height={270}
          src="/walking-logo-white.gif"
          alt="Left Image"
          ></Image>
      </motion.div>
      </div>
      <div className="z-20">
        <button className="font-bold absolute bottom-0 left-1/2 -translate-x-1/2 pb-10 text-white md:text-lg">
          scroll
        </button>
        <p className="absolute bottom-0 h-6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
          <svg
            id="A8J3VXB3U159zCTg"
            viewBox="0 0 16.0 31.347603289849417"
            preserveAspectRatio="none"
            className="block w-full h-full overflow-visible opacity-100 min-h-1 cursor-pointer" // Converted to Tailwind classes
            style={{
              stroke: "#ffffff",
              fill: "#ffffff",
              background: "url('data:image/png;base64,')" // You would replace the empty base64 with your actual background image
            }}
          >
            <g id="gYWlPgUXDGDTQDwk">
              <path
                d="M8.000000000000114,0.0 L8.000000000000114,20.347603289849417"
                style={{ fill: "none", strokeWidth: "4px", strokeLinecap: "butt" }} // SVG-specific styles remain inline
              />
              <path
                id="TS6repAaIuZKssxQ"
                d="M14.0,21.347603289849303 L8.0,29.347603289849303 L2.0,21.347603289849307 Z"
                style={{ strokeLinejoin: "round", strokeLinecap: "round", strokeWidth: "4px", fill: "inherit" }} // SVG-specific styles remain inline
              />
            </g>
          </svg>
        </p>
      </div>
    </>
  );
}

