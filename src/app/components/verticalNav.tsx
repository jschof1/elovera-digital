import Head from 'next/head';

const VerticalNav = ({ onCategoryClick, selectedCategory }) => {
    const verticalStyle = {
        padding: '0px 0px 10px 10px',
        whiteSpace: 'nowrap',
        // add hover effect
        
    };

    const handleCategoryClick = (category) => {
        // Assume the category names are always plural and end with 'S'
        const singularCategory = category.endsWith('S') ? category.slice(0, -1) : category;
        onCategoryClick(singularCategory);
    };

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="w-1/8 py-12 mt-9 ml-16" style={{ fontFamily: "'League Spartan Variable', sans-serif" }}>
                <ul>
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
                    </li>;

                </ul>
            </div>
        </>
    );
};

export default VerticalNav