'use client'
import Image from 'next/image'
import Navbar from '../components/navBar';

export default function About() {
    return (
        <div>
            <section className="py-10 lg:py-20 bg-stone-100 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <div className="lg:max-w-md">
                                <div className="px-4 pl-4 mb-6">
                                    <h1 className="mt-2 text-3xl text-center font-black text-gray-700 md:text-5xl dark:text-gray-300">
                                        About
                                    </h1>
                                </div>
                                <p className="text-2xl mb-10 leading-7 text-gray-500 dark:text-gray-400 text-center">
                                    words words lots of words about words words words lots of words about wordswords words lots of words about wordswords words lots of words about wordswords words lots of words about words
                                </p>

                            </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/2 lg:mb-0 flex flex-col items-center">
                            <Image
                                className="relative z-40 w-full h-auto rounded  -scale-x-100"
                                width="500" // Adjust the width as needed
                                height="300" // Adjust the height as needed
                                src="/walking-logo-black.gif"
                                alt="Walking logo"
                            />
                            <div className="flex justify-center space-x-6">
                                {/* Facebook Icon */}
                                <Image
                                    src="https://elovera.my.canva.site/your-paragraph-text/images/4e04b0dff84dbc306ebe87bb08fb1a31.svg"
                                    alt="Blue Official Facebook Logo Social Media Icon"
                                    width={13} // Define the size as needed
                                    height={13}
                                />
                                {/* Instagram Icon */}
                                <Image
                                    src="https://elovera.my.canva.site/your-paragraph-text/images/2304c56c16ba3017c88feaad5346baea.svg"
                                    alt="Instagram Outline Logo"
                                    width={23} // Define the size as needed
                                    height={23}
                                />
                                {/* Twitter Icon */}
                                <Image
                                    src="https://elovera.my.canva.site/your-paragraph-text/images/15bec490eced4473a6894e6858e1f9fa.svg"
                                    alt="Flat Fill Twitter Icon"
                                    width={23} // Define the size as needed
                                    height={23}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}