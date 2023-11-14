'use client'
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';



const PlaylistPlayer = () => {
    const playlistId = 'PLYapdvbx1R5huZpmBlKovF_VwdUUdjS81';
    const apiKey =  "AIzaSyAyoj-6loeFK9UftQRhNRM4CRUN0Hl_Pj0";

    const [player, setPlayer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playlistItems, setPlaylistItems] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            if (!playerRef.current) { // Ensure the player is only set once
                playerRef.current = new YT.Player('player', {
                height: '360',
                width: '640',
                playerVars: {
                    listType: 'playlist',
                    list: playlistId,
                    autoplay: 0, // Disable autoplay
                    mute: 0, // Enable audio
                },
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };
    };
        // Cleanup function to remove script and player
        return () => {
            if (window.YT) {
                delete window.YT;
                delete window.onYouTubeIframeAPIReady;
            }
        };
    }, []);
        useEffect(() => {
            fetchPlaylistItems();
        }, []);

        const fetchPlaylistItems = async () => {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setPlaylistItems(data.items);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };
    const onPlayerReady = (event) => {
        // Enable the play button here, or set state that will do this in your render method
        fetchPlaylistItems();
        setPlayer(playerRef.current); // Save the player in state if needed
        // Optionally, auto-play the first video
        playVideo(0);
    };
    const onPlayerStateChange = (event) => {
        // This needs to be a useEffect hook.
        useEffect(() => {
            let interval;
            if (event.data === YT.PlayerState.PLAYING) {
                interval = setInterval(() => {
                    const player = playerRef.current;
                    setCurrentTime(player.getCurrentTime());
                    setDuration(player.getDuration());
                    setProgress((player.getCurrentTime() / player.getDuration()) * 100);
                }, 1000);
            }
            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }, [event.data]); // React will now cleanup the interval when component unmounts or event.data changes.
    };
    const play = () => {
        const player = playerRef.current;
        console.log('Attempting to play video:', player); // Log to check the player object

        if (player && typeof player.getPlayerState === 'function') {
            const playerState = player.getPlayerState();
            console.log('Player state:', playerState); // Log to check the player state

            if (playerState === YT.PlayerState.UNSTARTED || playerState === YT.PlayerState.CUED) {
                player.playVideo();
            }
        } else {
            console.error('YouTube Player is not ready or getPlayerState is not available on the player object.');
        }
    };

    const pause = () => {
        const player = playerRef.current;
        if (player && player.pauseVideo) {
            player.pauseVideo();
        }
    };

    const nextSong = () => {
        const player = playerRef.current;
        let nextIndex = currentIndex + 1;
        if (nextIndex >= playlistItems.length) {
            nextIndex = 0;
        }
        playVideo(nextIndex); // Use the playVideo function to handle playing the next song
    };

    const playVideo = (index) => {
        const player = playerRef.current;
        if (player && player.loadVideoById && playlistItems[index]) {
            const videoId = playlistItems[index].snippet.resourceId.videoId;
            player.loadVideoById(videoId);
            setCurrentIndex(index); // Updating the current index to the one being played
        }
    };


    //     setCurrentIndex(nextIndex);
    //     if (player && player.loadVideoById && playlistItems[nextIndex]) {
    //         const videoId = playlistItems[nextIndex].snippet.resourceId.videoId;
    //         player.loadVideoById(videoId);
    //     }
    // };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (
        <div className="font-sans w-80 flex flex-col justify-between h-40 shadow-xl rounded-lg p-4 bg-white">
            <div className="text-lg font-bold text-center mb-2 truncate">
                {/* {playlistItems[currentIndex] ? playlistItems[currentIndex].snippet.title : 'Loading...'} */}
            </div>
            <div className="flex justify-center items-center flex-1">
                <button onClick={play} className="mx-2">
                    <FontAwesomeIcon icon={faPlay} className="text-3xl text-gray-800 hover:text-blue-500" />
                </button>
                <button onClick={pause} className="mx-2">
                    <FontAwesomeIcon icon={faPause} className="text-3xl text-gray-800 hover:text-blue-500" />
                </button>
                <button onClick={nextSong} className="mx-2">
                    <FontAwesomeIcon icon={faStepForward} className="text-3xl text-gray-800 hover:text-blue-500" />
                </button>
            </div>
            <div className="flex flex-col justify-center items-center flex-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between w-full text-xs mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
    }

export default PlaylistPlayer;