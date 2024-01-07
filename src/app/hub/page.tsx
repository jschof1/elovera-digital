"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HubData } from "@/data";
import styled from "styled-components";
import VideoModal from "../components/videoModal";
import VerticalNav from "../components/verticalNav";
import GridItem from "../components/gridItem";
import shuffleArray from "../utils/shuffleArray";

const VideoListStyled = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  .video-list {
    display: grid;
    place-items: center;
    gap: 1rem;
    scroll-snap-type: y fmandatory;
    overflow-y: scroll;
    max-height: calc(100vh + 1rem);
    @media (min-width: 768px) {
      & {
        gap: 2rem;
      }
    }
    & > div:first-child {
      margin-top: 1rem;
    }
    & .video {
      scroll-snap-align: center;
    }
  }
`;

const Hub = () => {
  // State initialization
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoItems, setModalVideoItems] = useState([]);
  const [hasMoreItemsToFetch, setHasMoreItemsToFetch] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
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
  const getMoreVideos = async (page, pageSize) => {
    // Assuming HubData is available here. If not, you might need to pass it as a parameter or fetch it.

    // Determine the category key
    const categoryKey = selectedCategory ? selectedCategory.toLowerCase() : "all";

    // Filter the data based on the category
    let data = categoryKey === "all" ? [].concat(...Object.values(HubData)) : HubData[categoryKey] || [];
    data = shuffleArray(data); // Shuffle only if needed

    // Calculate start and end index for slicing the data array
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Return the sliced data for the current page
    return data.slice(startIndex, endIndex);
  };

  const fetchMoreData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Fetch more videos logic
      const nextPage = page + 1;
      const moreVideos = await getMoreVideos(nextPage, pageSize);

      setModalVideoItems(prevVideos => {
        // Avoid duplication if the clicked video is already in the list
        return prevVideos[0]?.src === selectedVideoId
          ? [...prevVideos, ...moreVideos.filter(video => video.src !== selectedVideoId)]
          : [...prevVideos, ...moreVideos];
      });

      setPage(nextPage);
      setHasMoreItemsToFetch(moreVideos.length === pageSize);
    } catch (error) {
      console.error("Error fetching more videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  const handleItemClick = (videoId) => {
    setSelectedVideoId(videoId);
    setIsModalOpen(true);

    // Rearrange modalVideoItems so the clicked item comes first
    const clickedVideoIndex = contentData.findIndex(video => video.src === videoId);
    if (clickedVideoIndex >= 0) {
      const clickedVideo = contentData[clickedVideoIndex];
      const restOfVideos = [
        ...contentData.slice(0, clickedVideoIndex),
        ...contentData.slice(clickedVideoIndex + 1)
      ];
      setModalVideoItems([clickedVideo, ...restOfVideos]);
    }
    setHasMoreItemsToFetch(true); // Reset for new modal opening
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
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    onItemClick={() => handleItemClick(item["src"])}
                  />
                </li>
              ))}
            </ul>
          )}
          <VideoListStyled className="container">
          <VideoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            videoItems={modalVideoItems}
            fetchMoreData={fetchMoreData}
            hasMore={hasMoreItemsToFetch}
          />
    </VideoListStyled >
          {isLoading && <div>Loading...</div>}
          {!isLoading && contentData.length === 0 && <div>No items to display.</div>}
        </div>
      </div>
      <div ref={loader} className="loader p-5" />
    </>
  );
};

export default Hub;
