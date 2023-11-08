'use client'
import  Navbar from './components/navBar';
import Image from 'next/image';

export default function Home() {

  const style = {
    display: 'block',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    opacity: 1.0,
    minHeight: '1px',
    stroke: '#ffffff',
    fill: '#ffffff',
    background: "url('data:image/png;base64,')"
  }

  return (
      <>
    <Navbar />
      <div className="isolate bg-black">
        <video
          autoPlay
          muted
          loop
          id="bgVideo"
          className="z-0 overflow-hidden object-cover min-w-full"
        >
          <source
            width='100%'
            height={1000}
            src="https://elovera.my.canva.site/your-paragraph-text/videos/fb6e4467e7053efb0979ec228db7d7e1.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="pt-6">
        {/* Centered Image */}
        <Image
          width={1100}
          height={1100}
          src="https://elovera.my.canva.site/your-paragraph-text/images/513c180505cdae6d658f1092b700074a.png"
          alt="Centered Image"
          className="absolute top-1/2 mt-36 ml-15 left-1/2 z-10 h-48 -translate-x-1/2 -translate-y-1/2 md:top-1/1"></Image>


        {/* Left Image */}
        <Image
          width={600}
          height={500}
          src="https://elovera.my.canva.site/your-paragraph-text/videos/bd98568cfc6ee9c87da323693e0e2e9f.gif"
          alt="Left Image"
          className="absolute bottom-[10%] right-[60%] h-[900px] -translate-x-10"></Image>
        
      </div>
      <div className="z-20">
        <button className="font-bold absolute bottom-0 left-1/2 -translate-x-1/2 pb-10 text-white md:text-lg">
          scroll
        </button>
        <p className="absolute bottom-0 h-6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
          <svg
            id="A8J3VXB3U159zCTg"
            viewBox="0 0 16.0 31.347603289849417"
            preserveAspectRatio="none"
            className="block w-full h-full overflow-visible opacity-100 min-h-1 cursor-pointer" // Converted to Tailwind classes
            style={{
              stroke: "#ffffff",
              fill: "#ffffff",
              background: "url('data:image/png;base64,')" // You would replace the empty base64 with your actual background image
            }}
          >
            <g id="gYWlPgUXDGDTQDwk">
              <path
                d="M8.000000000000114,0.0 L8.000000000000114,20.347603289849417"
                style={{ fill: "none", strokeWidth: "4px", strokeLinecap: "butt" }} // SVG-specific styles remain inline
              />
              <path
                id="TS6repAaIuZKssxQ"
                d="M14.0,21.347603289849303 L8.0,29.347603289849303 L2.0,21.347603289849307 Z"
                style={{ strokeLinejoin: "round", strokeLinecap: "round", strokeWidth: "4px", fill: "inherit" }} // SVG-specific styles remain inline
              />
            </g>
          </svg>
        </p>
      </div>
    </>
  );
}

