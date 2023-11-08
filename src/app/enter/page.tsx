import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'


export default function Enter() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        // Simulate loading / API call
        setTimeout(() => {
            setLoading(false);
            router.push('/');
        }, 2000);
    };

    return (
        <div>
            {loading ? (
                <div><Image alt="loading" src="/loading.gif"></Image></div> 
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="password" placeholder="Enter password" />
                    <button type="submit">Enter</button>
                </form>
            )}
        </div>
    );
}