'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Products } from '@/data';
import Image from 'next/image';


const ProductPage = () => {
    // State to hold the current image source
    const [currentImageSrc, setCurrentImageSrc] = useState(Products[0].images[0].src);

    // Function to update the current image
    const handleThumbnailClick = (newSrc) => {
        setCurrentImageSrc(newSrc);
    };

    
    return (
        <section className="py-10 font-roboto pt-36 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap mb-24 -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                        <div className="sticky top-0 overflow-hidden">
                            <div className="relative mb-6 lg:mb-10">
                                <Image
                                    className="w-full object-contain lg:h-full"
                                    src={currentImageSrc}
                                    width={500}
                                    height={500}
                                    alt=""
                                />
                            </div>
                            <div className="hidden md:flex flex-wrap -mx-2">
                                {Products[0].images.map((image, index) => (
                                    <div key={index} className="p-2 w-1/2 sm:w-1/4">
                                        <button onClick={() => handleThumbnailClick(image.src)} className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300">
                                            <Image
                                                className="w-full object-contain lg:h-28"
                                                src={image.src}
                                                width={100}
                                                height={100}
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <div className="lg:pl-20">
                            <div className="mb-6">
                                <div className="text-2xl font-bold text-green-400 pb-5">
                                    ELOVERA
                                </div>
                                <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300 leading-loose tracking-wide max-w-xl -mt-6">
                                    Original Logo T-Shirt
                                </h1>
                                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-400 mt-36">
                                    £40
                                </p>
                            </div>
                            <div className="pb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-primary dark:text-blue-200">
                                    Ships from UK
                                    <span className="ml-8 text-gray-600 dark:text-gray-400">
                                        In Stock
                                    </span>
                                </p>
                            </div>
                                <span className="text-base text-gray-600 dark:text-gray-400">Made from natural and sustainable materials</span>
                            <div className="mb-6 " />
                            <div className="flex flex-wrap items-center mb-6">
                                <div className="mb-4 mr-4 lg:mb-0">
                                    <div className="w-28">
                                        <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                            <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                <span className="m-auto text-2xl font-thin">-</span>
                                            </button>
                                            <input type="number" className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder={1} />
                                            <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 lg:mb-0">
                                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-primary hover:bg-primary hover:border-primary dark:bg-primary dark:hover:bg-primary dark:hover:border-primary dark:hover:text-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className=" bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4 mb-6">
                                <a href="#" className="w-full px-4 py-3 text-center text-gray-100 bg-primary border border-transparent dark:border-gray-700 hover:border-primary hover:text-primary hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                    Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;

// const ProductPage = () => {
//     let product = Products[0];

//     return (
//         <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="py-10 font-poppins dark:bg-gray-900 bg-black text-white">
//             <div className="max-w-6xl px-4 mx-auto">
//                 <div className="flex flex-wrap mb-24 -mx-4">
//                     <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
//                         <div className="sticky top-0 overflow-hidden ">
//                             <motion.div
//                                 whileHover={{ scale: 1.05 }}
//                                 className="relative mb-6 lg:mb-10 lg:h-96">
//                                 <Image className="object-cover w-full lg:h-full transition-transform duration-500 ease-in-out transform hover:scale-110" src={product.thumb_src} alt={product.title} width={500} height={300} layout="responsive" />
//                             </motion.div>
//                         </div>
//                     </div>
//                     <div className="w-full px-4 md:w-1/2">
//                         <div className="lg:pl-20">
//                             <motion.span
//                                 whileHover={{ scale: 1.1 }}
//                                 className="px-2.5 py-0.5 text-xs bg-primary">
//                                 New Arrival
//                             </motion.span>
//                             <motion.h2
//                                 whileHover={{ scale: 1.03 }}
//                                 className="max-w-xl mt-6 mb-6 text-3xl font-bold leading-tight tracking-wide">
//                                 {product.title}
//                             </motion.h2>
//                             <p className="text-2xl font-semibold ">
//                                 <span>{product.price}</span>
//                                 <span className="ml-3 text-lg font-normal text-gray-400 line-through">{product.originalPrice}</span>
//                             </p>
//                             {/* Add CTA for user engagement */}
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="mt-4 px-6 py-2 bg-primary text-white rounded-full focus:outline-none shadow-lg">
//                                 Listen Now
//                             </motion.button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </motion.section>
//     )
// }

// export default ProductPage;