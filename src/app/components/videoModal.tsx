import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const VideoModal = ({ isOpen, onClose, videoItems, fetchMoreData, hasMore }) => {
    if (!isOpen) return null;

    const [videos, setVideos] = useState<VideoType[]>([]);
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [mute, setMute] = useState<boolean>(true);



    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <InfiniteScroll
                    dataLength={videoItems.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    onScroll={() => {
                        scrollBy(0, -1);
                    }}
                // Add below props for pull down functionality if needed
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                  <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                  <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
                >
                    {playingVideo && videoItems.map((video, index) => (
                        // Replace this with how you want to render each video
                        <div key={index}>
                            <iframe
                                width="100%"
                                height="300"
                                src={`https://www.youtube.com/embed/${video.src}`}
                                title="Video"
                                allowFullScreen
                            />
                        </div>
                    ))}
                </InfiniteScroll>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default VideoModal;