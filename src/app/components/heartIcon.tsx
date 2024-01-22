import React from 'react';

interface HeartIconProps {
    isFavorite: boolean;
    onClick: () => void; // Update this type according to the expected onClick function signature
}

// eslint-disable-next-line react/display-name
const HeartIcon: React.FC<HeartIconProps> = React.memo(({ isFavorite, onClick }) => {
    const fill = isFavorite ? "#19a45a" : "none";
    return (
        <div className="heart-container scale-150 cursor-pointer" onClick={onClick}>
            <svg
                viewBox="0 0 52 29.6"
                className="w-5 h-5"
            >
                <path
                    d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z"
                    fill={fill}
                    stroke="#19a45a"
                    strokeWidth="4"
                />
            </svg>
        </div>
    );
});

export default HeartIcon;
