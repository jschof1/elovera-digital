'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Products } from '@/data';
import VerticalNav from '../components/verticalNav';

interface HeartIconProps {
    isFavorite: boolean;
    onClick: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isFavorite, onClick }) => {
    const fill = isFavorite ? "#d32f2f" : "none"; // Red fill if favorite, otherwise transparent

    return (
        <div className="heart-container cursor-pointer" onClick={onClick}>
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

const Shop: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<Favorites>({});

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [id]: !prevFavorites[id],
        }));
    };


    return (
        <>
            <div className="container mx-auto mt-10">
                <div className="flex flex-col md:flex-row w-fit"> {/* Stacks on mobile and side-by-side on larger screens */}
                    <div className="w-full md:w-auto"> {/* Allows the nav to take full width on mobile and auto width on larger screens */}
                        <VerticalNav
                            selectedCategory={selectedCategory ?? ''}
                            onCategoryClick={setSelectedCategory}
                        />
                    </div>
                    <div className="flex flex-col items-center w-full"> {/* Centers the content and ensures full width */}
                        <ul className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 px-8 pt-20"> {/* Adjusts the number of columns based on the screen size */}
                                {Products.filter(product => {
                                    const category = selectedCategory && selectedCategory.endsWith('S')
                                        ? selectedCategory.slice(0, -1).toUpperCase()
                                        : selectedCategory?.toUpperCase();

                                    return !category || product.type.toUpperCase() === category;
                                }).map((product) => {
                                    const hasImages = product.images && product.images[0] && product.images[0].src;
                                    const isFavorite = favorites[product.id];
                                    return (
                                        <li key={product.id} className="mb-1">
                                            {hasImages ? (
                                                <Link href={`/${product.id}`} passHref>
                                                    <Image
                                                        className="object-cover mb-2"
                                                        src={product.thumb_src}
                                                        alt={product.thumb_alt || 'Product Image'}
                                                        width={500}
                                                        height={300}
                                                        layout="responsive"
                                                    />
                                                </Link>
                                            ) : (
                                                <p>No image available</p>
                                            )}
                                            <div className='flex justify-between'>
                                                <div className="font-bold">{product.title}</div>
                                                <div>£{product.price}</div>
                                                <HeartIcon
                                                    isFavorite={isFavorite}
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Shop;