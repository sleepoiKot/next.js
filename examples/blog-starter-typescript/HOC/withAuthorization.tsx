import { useState, useEffect } from 'react'
import { useCurrentSession } from '../hooks/useCurrentUser';

export interface WithAuthProps {
    isLoggedIn: boolean;
}


export function withAuthorization<T extends WithAuthProps = WithAuthProps> (Component: React.ComponentType<T>) {
    return (props: Omit<T, keyof WithAuthProps>) => {
        const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

        useEffect(() => {
            if (isLoggedIn) {
            // nit: early return
            return;
            }

            const session = useCurrentSession();
            setIsLoggedIn(session.isLoggedIn);
        }, [isLoggedIn]);

        return <Component {...(props as T)} isLoggedIn={isLoggedIn} />
    }
}