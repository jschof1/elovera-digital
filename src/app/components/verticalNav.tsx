import Head from 'next/head';
import React from 'react'; // Import React (sometimes needed depending on your setup)

interface VerticalNavProps {
    onCategoryClick: (category: string) => void;
    selectedCategory: string;
    categories: string[];
}

// const verticalStyle: React.CSSProperties = {
//     padding: '0px 0px 10px 10px',
//     whiteSpace: 'nowrap',
// };

const VerticalNav: React.FC<VerticalNavProps> = ({ onCategoryClick, selectedCategory, categories = [] }) => { // Default categories to an empty array
    const handleCategoryClick = (category: string) => {
        const singularCategory = category.endsWith('S') ? category.slice(0, -1) : category;
        onCategoryClick(singularCategory);
    };

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="fixed z-20 w-1/8 mr-10 lg:mt-32 lg:ml-10 lg:top-0 md:m-0 sm:m-0 overflow-y-auto max-h-screen" style={{ fontFamily: "'League Spartan Variable', sans-serif" }}>
                <ul className='flex justify-around text-white md:block md:gap-1'>
                    {categories.map((category) => (
                        <li key={category}
                            className={`font-bold p-2 md:p-3 lg:p-4 md:text-4xl lg:text-5xl cursor-pointer`}
                            
                            onClick={() => handleCategoryClick(category)}
                        >
                            <span className={`lg:p-2 md:p-0 hover:bg-primary ${selectedCategory === category ? 'bg-primary' : ''}`}>
                                {category}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default VerticalNav;
