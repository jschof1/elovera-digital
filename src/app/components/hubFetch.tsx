import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const HubFetch = ({ item, height = 300, width = 500, autoplay = 1, onlyVideo }) => {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   if (item.src) {
  //     // Load YouTube IFrame Player API and setup player
  //     const tag = document.createElement('script');
  //     tag.src = 'https://www.youtube.com/iframe_api';
  //     const firstScriptTag = document.getElementsByTagName('script')[0];
  //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //     window.onYouTubeIframeAPIReady = () => {
  //       videoRef.current = new window.YT.Player(`youtube-video-${item.src}`, {
  //         videoId: item.src,
  //         playerVars: { autoplay: autoplay, controls: 1 },
  //       });
  //     };
  //   }
  // }, [item.src, autoplay]);

  // Render video iframe or image based on the item properties
  return (
    <>
      {item.src && !onlyVideo && (
        <div className="relative overflow-hidden rounded-lg shadow-xl shadow-green-600 bg-black">
          <iframe
            id={`youtube-video-${item.src}`}
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${item.src}`}
            title={item.title || 'Video'}
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
      {item.images && item.images[0] && (
        <div className="relative overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.title}
            width={500}
            height={300}
            layout="responsive"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default HubFetch;