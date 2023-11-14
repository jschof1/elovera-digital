
'use client'
import Head from 'next/head';
import { motion,  LayoutGroup, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { HubData } from '@/data'; // Ensure this import path is correct and points to your data
import VerticalNav from '../components/verticalNav';


const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface HeartIconProps {
  isFavorite: boolean;
  onClick: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isFavorite, onClick }) => {
  const fill = isFavorite ? "#d32f2f" : "none"; // Red fill if favorite, otherwise transparent

  return (
    <div className="heart-container scale-150 cursor-pointer" onClick={onClick}>
      <svg
        viewBox="0 0 52 29.6"
        className="w-5 h-5"
      >
        <path
          d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z"
          fill={fill}
          stroke="#d32f2f"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

type Favorites = {
  [key: string]: boolean;
};

const Hub: React.FC = () => {
  const [page, setPage] = useState(1); // State to keep track of the current page
  const pageSize = 10; // Number of items to load per page

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorites>({});
  const [isLoading, setIsLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 100,
    restDelta: 0.001
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const categories = ['ALL', 'WATCH', 'LISTEN', 'READ', 'PARTY'];

  const loader = useRef(null);

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

const contentData = useMemo(() => {
    const categoryKey = selectedCategory ? selectedCategory.toLowerCase() : 'all';
    const data = categoryKey === 'all'
      ? Object.keys(HubData).reduce((acc, key) => [...acc, ...HubData[key]], [])
      : HubData[categoryKey] || [];
    return data.slice(0, page * pageSize);
  }, [selectedCategory, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100) return;
    setPage(prevPage => prevPage + 1); // Load next page
  }, []);

  const getImageSrc = (hub) => {
    switch (selectedCategory) {
      case 'WATCH':
        return hub.img; // for WATCH category
      case 'PARTY':
        return hub.images[0]; // for PARTY category, assuming it's always present
      default:
        return null; // no images for LISTEN and READ
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', handleScroll);
    
  }, [handleScroll]);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Image src="/walking-logo-black.gif" alt="Loading..." width={100} height={100} />
        </div>
      );
    }
    // Render the actual content when not loading
    return (

          <LayoutGroup>
      <AnimatePresence>
        <motion.ul
          layout
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 px-4 pt-10"
          variants={gridItemVariants}
        >
          {contentData.map((item, index) => (
            <motion.div
              key={item.id || index}
              layout
              variants={gridItemVariants}
              whileHover={{ scale: 1.05 }}
              className="group p-2 rounded-lg"
              transition={{ duration: 0.5 }} 
            >
            <li className="flex flex-col relative">

        
          {/* Wrap your image and title in a div with group-hover classes */}
          {item.img && (
            <div className="relative overflow-hidden">
              {/* On hover, remove grayscale and blur */}
              <div className="grayscale blur-sm rounded-lg group-hover:grayscale-0 group-hover:blur-none transition duration-800 ease-in-out">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={500}
                  layout="responsive"
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
              {/* Title is visible by default and hidden on hover */}
              <div className="absolute top-0 left-0  w-full h-full flex items-center justify-center group-hover:hidden">
                <span className="w-full h-full flex items-center justify-center text-white text-4xl text-center font-bold bg-black bg-opacity-60 rounded-lg p-5">
                  {item.title}
                </span>
              </div>
            </div>
          )}
        {/* Render video if available */}
        {item["Video ID"] && (
                  <div className="relative overflow-hidden">
                  <div className="grayscale blur-sm rounded-lg group-hover:grayscale-0 group-hover:blur-none transition duration-800 ease-in-out">
          <iframe
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${item["Video ID"]}`}
            title={item.Title || 'Video'}
            allowFullScreen
            loading="lazy"
          />
          </div>
                    {/* Title is visible by default and hidden on hover */}
                    <div className="absolute top-0 left-0  w-full h-full flex items-center justify-center group-hover:hidden">
                      <span className="w-full h-full flex items-center justify-center text-black text-4xl text-center font-bold bg-white bg-opacity-80 rounded-lg p-5">
                        {item.Title}
                      </span>
                    </div>
                    </div>
        )}
        {/* Render party image if available */}
        {item.images && item.images[0] && (
                  <div className="relative overflow-hidden">
                    <div className="grayscale blur-sm rounded-lg group-hover:grayscale-0 group-hover:blur-none transition duration-1000 ease-in-out">
          <Image
            src={item.images[0]}
            alt={item.title}
            width={500}
            height={300}
            layout="responsive"
            loading="lazy"
          />
                    </div>
                    {/* Title is visible by default and hidden on hover */}
                    <div className="absolute top-0 left-0  w-full h-full flex items-center justify-center group-hover:hidden">
                      <span className="w-full h-full flex items-center justify-center text-white text-4xl text-center font-bold bg-primary bg-opacity-60 rounded-lg p-5">
                        {item.Title}
                      </span>
                    </div>
                  </div>
                )}
              </li>
            </motion.div>
          ))}
        </motion.ul>
      </AnimatePresence>
      </LayoutGroup>
    );
  }, [isLoading, contentData]);


  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="progress-bar container mx-auto mt-10"  >
      <div className="flex flex-col sm:flex-row sm:w-auto">
        <div className="w-full sm:w-1/3 sm:pr-4">
          {/* Assuming VerticalNav is correctly implemented elsewhere */}
          <VerticalNav
            selectedCategory={selectedCategory ?? ''}
            onCategoryClick={setSelectedCategory}
            categories={categories}
          />
        </div>
        <div className="w-full sm:w-2/3">
         
              {renderContent()}


        </div>
      </div>
    </div>
     <div ref={loader} />
    </>
  );
  };

  export default Hub;