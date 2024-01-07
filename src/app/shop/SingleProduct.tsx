'use client'
import { useState } from 'react';
import { Products } from '@/data';
import Image from 'next/image'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";



const SingleProductCompo = (props: { id: number | string }) => {
    const { id } = props;

    const product = Products.find((p) => p.id.toString() === id);

    if (!product) {
        return <p>Product not found</p>;
    }

    // Initialize with the first image of the current product
    const [currentImageSrc, setCurrentImageSrc] = useState(product.images[0].src);

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
                                <Dialog >
                                    <DialogTrigger>
                                        <Image className="object-contain w-full lg:h-full" src={currentImageSrc} alt={product.title} width={500} height={300}  />
                                    </DialogTrigger>
                                    <DialogContent className="bg-transparent border-0">
                                        <Carousel className="h-[700px] w-[700px]" >
                                            <CarouselContent className="h-[700px] w-[700px]">
                                                {product.images.map((image, index) => (
                                                    <CarouselItem key={index}>
                                                        <Image
                                                            src={image.src}
                                                            alt={product.title}
                                                            width={1000}
                                                            height={1000}
                                                            layout="responsive"
                                                        />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </Carousel>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        <div className="hidden md:flex flex-wrap -mx-2">
                            {product.images.map((image, index) => (
                                <div key={index} className="p-2 w-1/2 sm:w-1/4">
                                    <button onClick={() => handleThumbnailClick(image.src)} className="block border border-gray-300 hover:border-green-500 hover:border-2 dark:border-gray-700 dark:hover:border-green-500">
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
                    <div className="lg:pl-20 mt-9">
                        <div className="mb-6">
                            <div className="text-2xl font-bold text-primary pb-5">
                                ELOVERA
                            </div>
                            <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300 leading-loose tracking-wide max-w-xl -mt-6">
                                {product.title}
                            </h1>
                            <div className="text-md font-bold text-gray-500 dark:text-gray-400">
                                {product.type}
                            </div>
                            <div className="my-4 text-gray-500 dark:text-gray-400 max-w-xl">
                                {product.description}
                            </div>
                            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                £{product.price}
                            </p>
                                <div className="mt-7 text-gray-500 dark:text-gray-400 max-w-xl">
                                    <select className="w-full p-2 h-10 border border-gray-300 rounded-md text-gray-500 dark:text-gray-400">
                                        <option>Size</option>
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>
                        </div>
                        <div className="pb-6">
                            <p className="text-sm text-primary dark:text-blue-200">
                                Ships from UK
                                <span className="ml-8 text-gray-600 dark:text-gray-400">
                                    In Stock
                                </span>
                            </p>
                        </div>
                        <span className="text-base italic text-gray-600 dark:text-gray-400">Made from natural and sustainable materials</span>
                        <div className="mb-6 " />
  
                        <div className="flex gap-4 mb-6 mt-30">
                            <a href="#" className="w-full px-4 py-3 text-center text-gray-100 bg-primary border border-transparent dark:border-gray-700 hover:border-primary hover:text-primary hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>
            <Accordion type="single" collapsible>

                <AccordionItem value="description">
                    <AccordionTrigger>Product Description</AccordionTrigger>
                    <AccordionContent>
                        This premium quality t-shirt is made from 100% organic cotton, offering both comfort and durability. Available in a variety of colors, it's perfect for everyday wear.
                    </AccordionContent>
                </AccordionItem>


                <AccordionItem value="size-chart">
                    <AccordionTrigger>Size Chart</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Size</th>
                                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Chest (inches)</th>
                                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Length (inches)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">Small</td>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">34-36</td>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">28</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">Medium</td>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">38-40</td>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">29</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">Large</td>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">42-44</td>
                                        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">30</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </AccordionContent>
                </AccordionItem>


                <AccordionItem value="care-instructions">
                    <AccordionTrigger>Care Instructions</AccordionTrigger>
                    <AccordionContent>
                        Machine wash cold with like colors. Do not bleach. Tumble dry low. Do not iron decoration.
                    </AccordionContent>
                </AccordionItem>


                <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping Information</AccordionTrigger>
                    <AccordionContent>
                        Ships within 3-5 business days. Free shipping on orders over $50.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        </section >
    )
}

export default SingleProductCompo
