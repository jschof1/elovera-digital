"use client";
import React, { useState, useEffect, useRef } from 'react';
import { HubData } from "@/data";
import Image from "next/image";
import Modal from "../components/modal";
import VerticalNav from "../components/verticalNav";
import GridItem from "../components/gridItem";
import shuffleArray from "../utils/shuffleArray";
import HubFetch from '../components/hubFetch'; 


const Hub = () => {
  // State initialization
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);


  const videoRefs = useRef([]);

  interface HeartIconProps {
    isFavorite: boolean;
    onClick: () => void;
  }

  const stripedBackground = {
    zIndex: 1,
    position: 'absolute',
    background: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2) 2px, rgb(0, 0, 0, 0.2) 2px, rgb(0, 0, 0) 3px)'
  };
  const HeartIcon: React.FC<HeartIconProps> = ({ isFavorite, onClick }) => {
    const fill = isFavorite ? "#d32f2f" : "none"; // Red fill if favorite, otherwise transparent

    return (
      <div className="heart-container scale-150 cursor-pointer" onClick={onClick}>
        <svg
          viewBox="0 0 52 29.6"
          className="w-5 h-5" // Adjust width and height as needed
        >
          <path
            d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z"
            fill={fill}
            stroke="#d32f2f" // Stroke color
            strokeWidth="4" // Stroke width
          />
        </svg>
      </div>
    );
  };


  type Favorites = {
    [key: string]: boolean;
  };

  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 gap-4";
  const categories = ["ALL", "WATCH", "LISTEN", "READ", "PARTY"];
  const pageSize = 50;
  const loader = useRef(null);

  // Function to open modal with selected video
  const openModal = (item) => {
    setSelectedVideo(item);
    setIsModalOpen(true);

    // Add a slight delay to ensure the modal is rendered
    setTimeout(() => {
      const index = contentData.findIndex(contentItem => contentItem.id === item.id);
      videoRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    
  };


  // Initialize Intersection Observer
  useEffect(() => {
    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [isLoading]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setIsLoading(true);
    const categoryKey = selectedCategory ? selectedCategory.toLowerCase() : "all";
    let data = categoryKey === "all" ? [].concat(...Object.values(HubData)) : HubData[categoryKey] || [];
    data = shuffleArray(data); // Shuffle only if needed
    setContentData(data.slice(0, pageSize));
    setPage(1);
    setIsLoading(false);
  }, [selectedCategory, pageSize]);

  return (
    <>
      <div className="container mx-auto mt-10 md:z-0">
        {/* Vertical Navigation */}
        <div className="z-50 md:hidden">
          <VerticalNav
            selectedCategory={selectedCategory ?? ''}
            onCategoryClick={setSelectedCategory}
            categories={categories}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Vertical Navigation for Medium and Larger Screens */}
          <div className="hidden z-50 md:block md:col-span-3">
            <VerticalNav
              selectedCategory={selectedCategory ?? ''}
              onCategoryClick={setSelectedCategory}
              categories={categories}
            />
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9 mt-8 md:mx-20">
            {!isLoading && contentData.length > 0 && (
              <ul className={gridClasses}>
                {contentData.map((item, index) => (
                  <li key={item.id} className="mx-0 flex flex-col">
                    <GridItem
                      key={item.id}
                      item={item}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      onItemClick={() => openModal(item)} // Add onClick handler
                    />
                  </li>
                ))}
              </ul>
              
              )}
            
              {isLoading && <div>Loading...</div>}
            {!isLoading && contentData.length === 0 && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1" style={{ width: '100vw', height: '100vw' }}>
              <Image
                width={90}
                height={90}
                src="/walking-logo-white.gif"
                alt="Left Image"
              ></Image>
            </div>}
            
          </div>
        </div>
      </div>
      <div ref={loader} className="loader p-5" />
      {/* Modal Component */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="overflow-y-auto snap-y snap-mandatory max-h-[100vh]" style={{ maxHeight: '100vh' }}>
            {contentData.map((item, index) => {
              const isFavorite = favorites[item.id];
              videoRefs.current[index] = React.createRef();
              return (
                <div key={item.id} ref={el => videoRefs.current[index] = el} className="snap-start h-screen flex flex-col items-center justify-center relative shadow-green-600">
                  {/* HubFetch Component */}
                  <HubFetch item={item} height={700} width={632} autoplay={1} />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full px-3 py-1 pointer-events-none" style={{ width: '5vw', height: '5vw' }}>
                    <Image
                      width={90}
                      height={90}
                      src="/walking-logo-white.gif"
                      alt="Left Image"
                    ></Image>
                  </div>
                  {/* Title and Heart Icon Container */}
                  <div className="absolute top-20 mt-3 left-5 right-5 w-94 flex justify-between items-center bg-white text-lg font-light p-3 z-20  rounded-t-lg hover:black">
                    {/* Title */}
                    <div className="flex-1 text-primary font-bold text-lg">
                      <span className='bg-white p-2'>
                        {/* bg different color on hover */}
                      {item.title}
                      </span> 
                    </div>

                    {/* Heart Icon */}
                    <div className="p-2">
                      <HeartIcon
                        isFavorite={isFavorite}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent grid item click event
                          toggleFavorite(item.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      )}

    </>
  );
};

export default Hub;
