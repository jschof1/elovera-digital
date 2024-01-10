import Image from 'next/image'; // Assuming you are using Next.js since Image component is imported

export default function HubFetch({ item, height, width, autoplay }) {
    // console.log(item);
    // Helper function to render video iframe
    // const renderVideo = (videoId, title) => (
    //     <div className="relative overflow-hidden">
    //         <div className="grayscale blur-sm rounded-lg group-hover:grayscale-0 group-hover:blur-none transition">
    //             <iframe
    //                 width="100%"
    //                 height="300"
    //                 src={`https://www.youtube.com/embed/${videoId}`}
    //                 title={title || 'Video'}
    //                 allowFullScreen
    //                 loading="lazy"
    //             />
    //         </div>
    //         <div className="stripe1 absolute top-0 left-0 w-full h-full flex items-center justify-center group-hover:hidden">
    //             <span className="w-full h-full flex items-center justify-center text-black text-4xl text-center font-bold bg-white bg-opacity-80 rounded-lg p-5">
    //                 {title}
    //             </span>
    //         </div>
    //     </div>
    // );
    // // Helper function to render image
    // const renderImage = (imageUrl, altText, title) => (
    //     <div className="relative overflow-hidden">
    //         <div className="grayscale blur-sm rounded-lg group-hover:grayscale-0 group-hover:blur-none transition duration-1000 ease-in-out">
    //             <Image
    //                 src={imageUrl}
    //                 alt={altText}
    //                 width={500}
    //                 height={300}
    //                 layout="responsive"
    //                 loading="lazy"
    //             />
    //         </div>
    //         <div className="stripe1 absolute top-0 left-0 w-full h-full flex items-center justify-center group-hover:hidden">
    //             <span className="w-full h-full flex items-center justify-center text-white text-4xl text-center font-bold bg-primary bg-opacity-60 rounded-lg p-5">
    //                 {title}
    //             </span>
    //         </div>
    //     </div>
    // );
    return (
        <>

            {item.img && (
                <div className="relative overflow-hidden">
                        <Image
                            src={item.img}
                            alt={item.title}
                            width={500}
                            height={500}
                            layout="responsive"
                            loading="lazy"
                            className="rounded-lg"
                            />
                </div>
            )}
            {item["src"] && (
                <div className="relative overflow-hidden">
                    <div>
                        <iframe
                            width={width}
                            height={height}
                            src={`https://www.youtube.com/embed/${item["src"]}?autoplay=${autoplay}`}
                            title={item.title || 'Video'}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            )}
            {item.images && item.images[0] && (
                <div className="relative overflow-hidden">
                    <div className="grayscale blur-sm rounded-lg group-hover:grayscale-0 group-hover:blur-none transition duration-1000 ease-in-out">
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            width={500}
                            height={300}
                            layout="responsive"
                            loading="lazy"
                        />
                    </div>
                </div>
            )}

        </>
    );
}
