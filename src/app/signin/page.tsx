'use client'
import signIn from "@/firebase/auth/signIn";
import Navbar from "../components/navBar";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const router = useRouter();

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

  return (
    <>
    <Navbar/>
      <div className="relative isolate bg-black h-screen"> {/* Set the container to position relative and full screen */}
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
      <div className="absolute inset-0 z-10 flex items-center justify-center"> {/* Set sign-in form to absolute position */}
      <div className="w-full max-w-xs">
        <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={( e ) => setEmail( e.target.value )}
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
              onChange={( e ) => setPassword( e.target.value )}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Page;
