import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

const PasswordPrompt: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password === 'password') {
            localStorage.setItem('hasVisited', 'true');
            router.push('/');
        } else {
            alert('Incorrect password');
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <h1>Please enter the password:</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PasswordPrompt;
