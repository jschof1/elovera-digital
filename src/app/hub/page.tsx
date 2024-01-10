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


  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 gap-4";
  const categories = ["ALL", "WATCH", "LISTEN", "READ", "PARTY"];
  const pageSize = 50;
  const loader = useRef(null);

  // Function to open modal with selected video
  const openModal = (item) => {
    console.log(item); // Add this to check the item structure
    setSelectedVideo(item);
    setIsModalOpen(true);
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
    setContentData([]); // Clear existing data when category changes
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
            {contentData.map((item, index) => (
              <div key={item.id} className="snap-start h-screen flex flex-col items-center justify-center">
                <HubFetch item={item} height={700} width={500} autoplay={1} />
              </div>
            ))}
          </div>
        </Modal>
      )}

    </>
  );
};

export default Hub;
