import { useState, useEffect } from "react";
import api from "../../utils/Api";

export default function Motd() {
    
    const [motd, setMotd] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchMotd() {
            try {
                const response = await api.get("/get/motd");
                setMotd(response.data.data);
            } catch (err) {
                setError("Failed to fetch message of the day.");
            } finally {
                setLoading(false);
            }
        }
        fetchMotd();
    }, []);

    return (

    <>
    <div>
        <h1>Today's message:</h1>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <pre>{motd}</pre>
        )}
    </div>

    </>
  );
}