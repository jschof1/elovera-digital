import React, { FC } from 'react';
import Image from 'next/image';

interface HubFetchProps {
  item: {
    src?: string;
    title?: string;
    images?: string[];
  };
  height?: number;
  width?: number;
  autoplay?: number;
  onlyVideo?: boolean;
}

const HubFetch: FC<HubFetchProps> = ({
  item,
  height = 300,
  width = 500,
  autoplay = 1,
  onlyVideo
}) => {
  return (
    <>
      {item.src && !onlyVideo && (
        <div className="relative overflow-hidden rounded-lg shadow-xl bg-black">
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
