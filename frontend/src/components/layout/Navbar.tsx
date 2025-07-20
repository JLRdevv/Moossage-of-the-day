// Lib
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// CSS
import './navbar.module.css';

export default function Navbar() {

    const [location, setLocation] = useState("/");
    const locationObj = useLocation();

    useEffect(() => {
        setLocation(locationObj.pathname);
    }, [locationObj.pathname]);

    return (
        <>
            <nav>
                <p>Moossage of the day!</p>
                {location === '/motd' ? (
                    <Link to="/about">About</Link>
                ) : (
                    <Link to="/motd">Moossage</Link>
                )
                }
            </nav>
        </>
    )
}