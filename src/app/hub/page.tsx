"use client"; // Import necessary libraries and components
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HubData } from "@/data"; // Ensure this import path is correct
import VerticalNav from "../components/verticalNav";
import GridItem from "../components/gridItem"; // This should be in a separate file
import shuffleArray from "../utils/shuffleArray"; // This should be in a separate file
import createModalContent from "../components/createModalContent";

const Hub = ({ onItemClick }) => {
  // State initialization
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [contentData, setContentData] = useState([]);

  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 gap-4";
  const categories = ["ALL", "WATCH", "LISTEN", "READ", "PARTY"];
  const pageSize = 50;
  const loader = useRef(null);

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  // Initialize Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Handlers for item click and favorite toggle
  const handleItemClick = (item) => {
    setModalContent(createModalContent(item));
    setIsModalOpen(true);
  };

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
      <div className="container mx-auto mt-10 grid grid-cols-12">
        <div className="col-span-3">
          <VerticalNav
            selectedCategory={selectedCategory ?? ''}
            onCategoryClick={setSelectedCategory}
            categories={categories}
          />
        </div>

        <div className="col-span-9 mt-8 mx-20">
          {!isLoading && contentData.length > 0 && (
            <ul className={gridClasses}>
              {contentData.map((item, index) => (
                <li key={item.id} className="mx-0 flex flex-col">
                  <GridItem
                    key={item.id}
                    item={item}
                    index={index}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    onItemClick={onItemClick}
                  />
                </li>
              ))}
            </ul>
          )}
          {isLoading && <div>Loading...</div>}
          {!isLoading && contentData.length === 0 && <div>No items to display.</div>}
        </div>
      </div>
      <div ref={loader} className="loader p-5" />
    </>
  );
};

export default Hub;
