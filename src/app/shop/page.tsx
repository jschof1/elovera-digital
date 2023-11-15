'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Products } from '@/data';
import VerticalNav from '../components/verticalNav';
import { motion, LayoutGroup, useScroll, useSpring, AnimatePresence } from 'framer-motion';


const gridItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

interface HeartIconProps {
    isFavorite: boolean;
    onClick: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isFavorite, onClick }) => {
    const fill = isFavorite ? "#d32f2f" : "none"; // Red fill if favorite, otherwise transparent

    return (
        <div className="heart-container scale-150 cursor-pointer" onClick={onClick}>
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
    const categories = ['T-SHIRTS', 'HOODIES', 'HATS', 'RECORDS'];


    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 1000,
        damping: 100,
        restDelta: 0.001
    });

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [id]: !prevFavorites[id],
        }));
    };

 return (
        <AnimatePresence>
            <div className="container mx-auto mt-10">
                <div className="flex flex-col sm:flex-row sm:w-auto">
                    <div className="w-full sm:w-1/3 sm:pr-4">
                        <VerticalNav
                            selectedCategory={selectedCategory ?? ''}
                            onCategoryClick={setSelectedCategory}
                            categories={categories}
                        />
                    </div>
                    <div className="w-full sm:w-2/3">
                     <motion.ul className="w-full" layout
                         initial="hidden"
                         animate="visible"
                         variants={gridItemVariants}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 pt-10 sm:pt-15 md:pt-20">
                                {Products.filter(product => {
                                    const category = selectedCategory && selectedCategory.endsWith('S')
                                        ? selectedCategory.slice(0, -1).toUpperCase()
                                        : selectedCategory?.toUpperCase();

                                    return !category || product.type.toUpperCase() === category;
                                }).map((product) => {
                                    const hasImages = product.images && product.images[0] && product.images[0].src;
                                    const isFavorite = favorites[product.id];
                                    return (
                                        <li key={product.id} className="mb-4 flex flex-col">
                                            {hasImages ? (
                                                <Link href={`/product/${product.id}`} passHref>
                                                    <div className="w-full overflow-hidden">
                                                        <motion.div
                                                            className="hover:grayscale-0 grayscale transition duration-300 ease-in-out"
                                                            variants={gridItemVariants}
                                                        >
                                                            <Image
                                                                className="object-cover mb-2"
                                                                src={product.images[0].src}
                                                                alt={product.title || 'Product Image'}
                                                                width={500}
                                                                height={300}
                                                                layout="responsive"
                                                            />
                                                        </motion.div>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <p>No image available</p>
                                            )}
                                            <div className='flex justify-between items-center'>
                                                <div className="text-xl">{product.title}</div>
                                                <HeartIcon
                                                    isFavorite={isFavorite}
                                                    onClick={() => toggleFavorite(product.id)}
                                                />
                                            </div>
                                            <div className="text-xl font-light">£{product.price}</div>
                                        </li>
                                    );
                                })}
                            </div>
                        </motion.ul>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default Shop;

