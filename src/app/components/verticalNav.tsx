import Head from 'next/head';
import React from 'react'; // Import React (sometimes needed depending on your setup)

interface VerticalNavProps {
    onCategoryClick: (category: string) => void;
    selectedCategory: string;
    categories: string[];
}

const verticalStyle: React.CSSProperties = {
    padding: '0px 0px 10px 10px',
    whiteSpace: 'nowrap',
};

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
            <div className="sticky top-0 z-50 w-1/8 mt-9 ml-16 mr-20 md:py-12" style={{ fontFamily: "'League Spartan Variable', sans-serif" }}>
                <ul className='md:block flex justify-around gap-5'>
                    {categories.map((category) => (
                        <li key={category}
                            style={verticalStyle}
                            className={`font-bold md:text-5xl sm:text-xl cursor-pointer hover:text-primary ${selectedCategory === category ? 'text-primary' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default VerticalNav;
