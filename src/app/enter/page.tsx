'use client'
import React, { useState, FormEvent } from 'react';
import Image from 'next/image'

const Enter: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    // const handleSubmit = (event: FormEvent) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     // Simulate loading / API call
    //     setTimeout(() => {
    //         setLoading(false);
    //         router.push('/');
    //     }, 2000);
    // };

    return (
        <div>
            {loading ? (
                <div><Image alt="loading" src="/loading.gif" width={500} height={300} /></div>
            ) : (
                <>
                    <input type="password" placeholder="Enter password" />
                    <button type="submit">Enter</button>
              </>  
            )}
        </div>
    );
}

export default Enter;