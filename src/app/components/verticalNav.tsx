import Head from 'next/head';
import React from 'react'; // Import React (sometimes needed depending on your setup)

interface VerticalNavProps {
    onCategoryClick: (category: string) => void; // Define the function type
    selectedCategory: string; // Define the string type
}

const VerticalNav: React.FC<VerticalNavProps> = ({ onCategoryClick, selectedCategory }) => {
    const verticalStyle: React.CSSProperties = {
        padding: '0px 0px 10px 10px',
        whiteSpace: 'nowrap',
        // TypeScript will ensure you add valid CSS properties here
    };

    const handleCategoryClick = (category: string) => {
        // TypeScript will ensure that 'category' is a string
        const singularCategory = category.endsWith('S') ? category.slice(0, -1) : category;
        onCategoryClick(singularCategory);
    };

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="w-1/8 py-12 mt-9 ml-16 mr-20 " style={{ fontFamily: "'League Spartan Variable', sans-serif" }}>
                <ul className='md:block flex justify-around gap-5'>
                    <li style={verticalStyle} className={`font-bold text-5xl cursor-pointer hover:text-primary ${selectedCategory === 'T-SHIRT' ? 'text-primary' : ''}`}
                        onClick={() => handleCategoryClick('T-SHIRTS')}>T-SHIRTS</li>
                    <li style={verticalStyle} className={`font-bold text-5xl cursor-pointer hover:text-primary ${selectedCategory === 'HOODIE' ? 'text-primary' : ''}`}
                        onClick={() => handleCategoryClick('HOODIES')}>HOODIES</li>
                    <li style={verticalStyle} className={`font-bold text-5xl cursor-pointer hover:text-primary ${selectedCategory === 'HAT' ? 'text-primary' : ''}`}
                        onClick={() => handleCategoryClick('HATS')}>HATS</li>
                    <li
                        style={verticalStyle}
                        className={`font-bold text-5xl cursor-pointer hover:text-primary ${selectedCategory === "RECORD" ? "text-primary" : ""
                            }`}
                        onClick={() => handleCategoryClick("RECORDS")}
                    >
                        RECORDS
                    </li>
                </ul>
            </div>
        </>
    );
};

export default VerticalNav;
