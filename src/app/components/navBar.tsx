import { useEffect, FormEvent } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Head from 'next/head';


export default function Nav() {
    const pathname = usePathname();
    const [searchParams, setSearchParams] = useSearchParams();

    const suggestions: string[] = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];
    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const shadow = 'shadow-lg'; // Tailwind class for larger shadow
    const scale = 'transform hover:scale-105 transition-transform duration-200'; // Scale effect on hover
    const perspective = 'perspective[1000px]'; // Custom class to add perspective (this will need to be defined in your CSS)

    const largeNavFont = {
       fontSize: '6rem'
    }

        const [isActive, setIsActive] = useState(false);

        const toggleActive = () => {
            setIsActive(!isActive);
        };
    useEffect(() => {
        // Convert searchParams to an array before filtering
        const suggestionsArray = Array.from(suggestions);
        setFilteredSuggestions(suggestionsArray.filter(suggestion =>
            suggestion.toLowerCase().startsWith(searchInput.toLowerCase())
        ));
    }, [searchInput]);

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target.value;
        setSearchInput(input);
    }
    const executeSearch = (suggestion: string): void => {
        setSearchInput(suggestion);
        // You may want to implement actual search logic here
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        executeSearch(searchInput);
    };

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;700&display=swap" rel="stylesheet" />
            </Head>
    <nav className={`sticky top-0 z-40 flex items-center justify-between w-full bg-primary md:hidden ${shadow} ${perspective}`}>
    <div className={`tham tham-e-squeeze scale-[120%] z-60 tham-w-12 px-6 py-9 ${isActive ? 'tham-active' : ''} lg:hidden`} onClick={toggleActive}>
                <div className="tham-box">
        <div className="tham-inner p-0 bg-white z-50"/>
</div>
    </div>
    </nav>
            {isActive && (
                <div className={`bg-primary fixed top-0 left-0 h-full w-full ${shadow}`}>
                <div className="fixed top-0 left-0 h-full w-full z-behind flex flex-col items-center justify-center">
                    <Link href="/hub">
                        <div onClick={toggleActive} style={largeNavFont} className="text-white font-extrabold py-2">HUB</div>
                    </Link>
                    <Link href="/shop">
                        <div onClick={toggleActive} style={largeNavFont} className="text-white font-extrabold py-2">SHOP</div>
                    </Link>
                    <Link href="/about">
                        <div onClick={toggleActive} style={largeNavFont} className="text-white font-extrabold py-2">ABOUT</div>
                    </Link>
                </div>
                    <div className="fixed p-4 bottom-0 left-0 z-60">
                        <Image
                            width={100}
                            height={100}
                            src="/walking-logo-white.gif"
                            alt="Left Image"
                            className="z-60"
                        ></Image>
                    </div>
                    </div>
            )}
            <nav className={`sticky flex w-full items-center justify-between md:flex-col lg:flex-row z-10 py-5 pr-70 bg-primary invisible md:visible md:flex ${shadow}`}>
                <div className="flex items-center md:w-full md:justify-center lg:w-auto text-2xl px-12">
                    <Link href="/" passHref>
                        <Image src="/logo-white.svg" width={30} height={30} alt="logo" />

                    </Link>
                    <Link href="/signin" passHref>
                    <button className="px-2 pl-24 text-white drop-shadow">Sign in</button>
                    </Link>
                </div>

                <div className="flex items-center pt-1 space-x-10 md:w-full md:justify-center lg:w-auto md:ml-42 text-2xl">
                    <Link href="/about" passHref>
                        <div className={`drop-shadow text-white transition duration-300 underline-effect ${pathname === '/about' ? 'border-b-2 border-white' : ''}`}>ABOUT</div>
                    </Link>
                    <Link href="/hub" passHref>
                        <div className={`drop-shadow text-white transition duration-300 underline-effect ${pathname === '/hub' ? 'border-b-2 border-white' : ''}`}>HUB</div>
                    </Link>
                    <Link href="/shop" passHref>
                        <div className={`drop-shadow text-white transition duration-300 underline-effect ${pathname === '/shop' ? 'border-b-2 border-white' : ''}`}>SHOP</div>
                    </Link>
                </div>

                {pathname === '/shop' ? (
                    <div className="px-12">
                        <svg fill="none" height="30" viewBox="0 0 24 24" width="155" xmlns="http://www.w3.org/2000/svg">
                            <g stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2">
                                <path d="m3 3h1.37144c.94838 0 1.76637.66607 1.95852 1.59479l2.34008 11.31041c.19215.9287 1.01014 1.5948 1.95856 1.5948h6.8714" />
                                <path d="m6.82422 7h12.85008c.6643 0 1.144.6359.9615 1.27472l-1.0141 3.54948c-.368 1.2879-1.5452 2.1758-2.8846 2.1758h-8.45976" />
                                <g fill="#000">
                                    <circle cx="16.5" cy="20.5" r=".5" />
                                    <circle cx=".5" cy=".5" r=".5" transform="matrix(1 0 0 -1 10 21)" />
                                </g>
                            </g>
                        </svg>
                    </div>
                ) : (
                    <div className="relative z-20 pr-12">
                            <div className="relative z-20 pr-12">
                                <svg
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white h-5 mt-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width={25}
                                    height={70}
                                    viewBox="0,0,256,256"
                                >
                                    <g
                                        fill="#ffffff"
                                        fillRule="nonzero"
                                        stroke="none"
                                        strokeWidth={1}
                                        strokeLinecap="butt"
                                        strokeLinejoin="miter"
                                        strokeMiterlimit={10}
                                        strokeDasharray=""
                                        strokeDashoffset={0}
                                        fontFamily="none"
                                        fontWeight="none"
                                        fontSize="none"
                                        textAnchor="none"
                                    >
                                        <g transform="scale(10.66667,10.66667)">
                                            <path d="M9,2c-3.85415,0 -7,3.14585 -7,7c0,3.85415 3.14585,7 7,7c1.748,0 3.34501,-0.65198 4.57422,-1.71875l0.42578,0.42578v1.29297l6,6l2,-2l-6,-6h-1.29297l-0.42578,-0.42578c1.06677,-1.22921 1.71875,-2.82622 1.71875,-4.57422c0,-3.85415 -3.14585,-7 -7,-7zM9,4c2.77327,0 5,2.22673 5,5c0,2.77327 -2.22673,5 -5,5c-2.77327,0 -5,-2.22673 -5,-5c0,-2.77327 2.22673,-5 5,-5z" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        <div className="input-padding">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    value={searchInput}
                                    onChange={handleInput}
                                    type="text"
                                    className="drop-shadow rounded-3xl border-2 border-white bg-transparent px-4 py-[2px] pl-8 text-white md:hidden lg:block tracking-widest outline-none"
                                    placeholder="."
                                />
                                <button type="submit" className="hidden">Search</button>
                                    {searchInput.length > 0 && (
                                        <div className="absolute left-0 w-full bg-white rounded-full shadow-lg">
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <div key={index} className="px-3 py-1 bg-opacity-50 hover:bg-gray-200 cursor-pointer rounded-3xl" onClick={() => executeSearch(suggestion)}>
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};
