// src/common/hooks/useFetch.jsx
import { useState, useEffect } from "react";

const useFetch = (apiCall, params = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall(params);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiCall, params]);

    return { data, loading, error };
};

export default useFetch;
