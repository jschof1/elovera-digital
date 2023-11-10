'use client'
import signIn from "@/firebase/auth/signIn";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { motion } from 'framer-motion';

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const router = useRouter();

  // Animation variants for the form
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  // Animation variants for the button
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgb(255, 255, 255)" },
    tap: { scale: 0.95 },
  };

  // Handle form submission
  const handleForm = async ( event: { preventDefault: () => void } ) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn( email, password );

    if ( error ) {
      // Display and log any sign-in errors
      console.log( error );
      return;
    }

    // Sign in successful
    console.log( result );

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or 
    // create a new page for admin
    router.push( "/admin" );
  }

  const videoStyle = {
    position: 'fixed', // Use fixed or absolute depending on your use case
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, // Ensures the video stays in the background
  };

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'fixed', zIndex: '-1' }}>
        <video autoPlay loop muted style={videoStyle}>
          <source
            src="https://elovera.my.canva.site/your-paragraph-text/videos/fb6e4467e7053efb0979ec228db7d7e1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <div className="w-full max-w-xs">
            <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 opacity-95 shadow-2xl">
              {/* Sign-in header and logo animations */}
              <motion.div
                className="flex justify-between items-center mb-6"
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
              >
                <motion.div
                  className="text-3xl font-bold text-black"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Sign In
                </motion.div>
                <Image src="/walking-logo-black.gif" width={70} height={70} alt="logo" className="-scale-x-100" />
              </motion.div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-primary hover:bg-white hover:text-primary"
                >
                  Sign In
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
        </div>
      </>
      );
}

export default Page;
