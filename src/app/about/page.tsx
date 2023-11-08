'use client'
import Image from 'next/image'
import Navbar from '../components/navBar';

export default function About() {
    return (
        <div>
            <Navbar/>
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
                                    Welcome to Elovera, a groundbreaking platform at the intersection of music sharing and [
                                    creative collaboration. More than just a website, Elovera is a dynamic space that unites the
                                    global dancing community, fostering a shared passion for rhythm and innovation.
                                    Elovera sets itself apart by seamlessly pulling data from platforms like You Tube and radio,
                                    creating a centralized hub where users can effortlessly share and explore a diverse range of
                                    music. This goes beyond conventional boundaries, allowing users to discover new artists
                                    and genres within a unified virtual space.
                                    What makes Elovera truly unique is its ability to blend content from various platforms,
                                    breaking down genre silos and encouraging a sense of unity among music communities. The
                                    platform goes beyond being a mere music-sharing space; it's a collaborative hub where
                                    users engage in discussions, share insights, and collaborate on creative projects.
                                    Elovera comes alive through its virtual parties, serving as a global dance floor where the
                                    community connects in real-time. These events bring together music enthusiasts from
                                    around the world, creating an electrifying fusion of music, dance, and shared experiences.
                                    Whether you're a music aficionado, aspiring artist, or simply looking to discover new beats,
                                    Elovera invites you to join its rhythmic journey. Experience the fusion of music and ideas in a
                                    dynamic space where every click propels you into a world of sounds and creativity. Welcome
                                    to Elovera, where the beat is eternal, and the possibilities are limitless.
                                    amet.
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
                            <div className="flex justify-center space-x-6 mt-10 ">
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