import React from 'react';
import Image from 'next/image';

const createModalContent = (item) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            {item.img && (
                <div className="mb-4">
                    <Image
                        src={item.img}
                        alt={item.title}
                        width={800}
                        height={450}
                        layout="responsive"
                        loading="lazy"
                    />
                </div>
            )}
            <p>{item.description}</p>
        </div>
    );
};

export default createModalContent;