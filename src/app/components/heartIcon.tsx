import React from 'react';
import { FaRegHeart } from "react-icons/fa";

// eslint-disable-next-line react/display-name
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

interface HeartIconProps {
    isFavorite: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default HeartIcon;