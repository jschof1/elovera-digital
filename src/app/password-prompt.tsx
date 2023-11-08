import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PasswordPrompt() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password === 'password') {
            localStorage.setItem('hasVisited', 'true');
            router.push('/');
        } else {
            alert('Incorrect password');
        }
    };
    
    return (
        <div>
            <h1>Please enter the password:</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
