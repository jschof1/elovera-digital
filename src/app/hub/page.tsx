
'use client'
import Head from 'next/head';
import { motion, LayoutGroup, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { HubData } from '@/data'; // Ensure this import path is correct and points to your data
import VerticalNav from '../components/verticalNav';
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";



const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface HeartIconProps {
  isFavorite: boolean;
  onClick: () => void;
}
const HeartIcon = React.memo(({ isFavorite, onClick }) => {
  const fill = isFavorite ? "#d32f2f" : "none";
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
});
type Favorites = {
  [key: string]: boolean;
};

const Modal = React.memo(({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  // This function will be called when the backdrop is clicked
  const handleBackdropClick = (event) => {
    // Prevent clicks from the modal content from closing the modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      onClick={handleBackdropClick} // Attach the click handler here
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4"
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-2xl max-w-lg w-full z-50">
        {content}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-primary text-4xl font-bold p-2 rounded"
        >
          <IoIosCloseCircle />
        </button>
        <div>
          <button onClick={onClose} className="mt-4 text-primary text-4xl font-bold p-2 rounded"><FaRegHeart /></button>
          <button onClick={onClose} className="mt-4 text-primary text-4xl font-bold p-2 rounded"><FaRegShareFromSquare /></button>
        </div>
      </div>
    </motion.div>
  );
}
);
const Hub: React.FC = () => {
  const [page, setPage] = useState(1); // State to keep track of the current page
  const pageSize = 10; // Number of items to load per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorites>({});
  const [isLoading, setIsLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 100,
    restDelta: 0.001
  });
  const handleItemClick = useCallback((item) => {
    console.log('item', item);
    setModalContent(
      <div>
        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
        {item.img && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="450" // Increased height
                src={`https://www.youtube.com/embed/${item["link"]}`}
                title={item.Title || 'Video'}
                allowFullScreen
                loading="lazy"
              />
            </div>
        )}
        {item["Video ID"] && (
          <div className="mb-4">
            <iframe
              width="100%"
              height="450" // Increased height
              src={`https://www.youtube.com/embed/${item["Video ID"]}`}
              title={item.Title || 'Video'}
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}
        {item.images && item.images[0] && (
          <div className="mb-4">
            <Image
              src={item.images[0]}
              alt={item.title}
              width={800} // Increased width
              height={450} // Adjusted height for aspect ratio
              layout="responsive"
              loading="lazy"
            />
          </div>
        )}
        <p>{item.description}</p>
      </div>
    );
    setIsModalOpen(true); // Open the modal when an item is clicked
  }, [setModalContent, setIsModalOpen]); // Correct dependencies

  const toggleFavorite = useCallback((id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = {
        ...prevFavorites,
        [id]: !prevFavorites[id],
      };
      return newFavorites;
    });
  }, []);

  const categories = ['ALL', 'WATCH', 'LISTEN', 'READ', 'PARTY'];

  const loader = useRef(null);

  const handleObserver = useCallback((entities: any[]) => {
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

  // Utility function to shuffle an array
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  const contentData = useMemo(() => {
    const categoryKey = selectedCategory ? selectedCategory.toLowerCase() : 'all';
    let data = categoryKey === 'all'
      ? Object.keys(HubData).reduce((acc: any[], key: string) => [...acc, ...HubData[key]], [])
      : HubData[categoryKey as keyof typeof HubData] || [];
    data = shuffleArray([...data]); // Use the spread operator to create a new array for shuffling
    return data.slice(0, page * pageSize);

  }, [selectedCategory, page, pageSize]);
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100) return;
    setPage(prevPage => prevPage + 1); // Load next page
  }, [setPage]);

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
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} content={modalContent} />
          <motion.ul
            layout
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 px-4 pt-10"
            variants={gridItemVariants}
          >
            {contentData.map((item, index) => {
              const isFavorite = favorites[item.id];
              return (
                <motion.div
                  key={item.id || index}
                  layout
                  layoutId={item.id} // Add a layoutId here
                  variants={gridItemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="group p-2 rounded-lg"
                  transition={{ duration: 0.5 }}
                >
                  <li className="flex flex-col relative"
                    onClick={() => handleItemClick(item)}>
                    <div className="absolute top-0 right-0 p-2 z-10">
                      <HeartIcon
                        isFavorite={isFavorite}
                        onClick={() => toggleFavorite(item.id)}
                      />
                    </div>

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
              )
            })}
          </motion.ul>
        </AnimatePresence>
      </LayoutGroup>
    );
  }, [isLoading, contentData, favorites, toggleFavorite, isModalOpen, modalContent]); // Added missing dependencies


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

function setModalContent(arg0: React.JSX.Element) {
  throw new Error('Function not implemented.');
}
function setIsModalOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function setFavorites(arg0: (prevFavorites: any) => any) {
  throw new Error('Function not implemented.');
}

function setPage(arg0: (prevPage: any) => any) {
  throw new Error('Function not implemented.');
}

