'use client' 
import HubGrid from '../components/hubGrid';
import Navbar from '../components/navBar';


export default function HubPage() {
  return (
    <>
    <Navbar/>
    <div>
      <HubGrid />
    </div>
    </>
  );
}