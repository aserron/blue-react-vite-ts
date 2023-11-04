import {useState, useEffect, useCallback, useRef} from 'react';

interface ApiResponse<T> {
    data: T;
    error?: string;
}

interface UseApiFetchOptions {
    limit?: number; // Max number of requests per minute
}

/**
 * Encapsulate fetch api, REST api consumption.
 *
 * The fetch data function is recalled and only recreated when:
 *  -  `url` value changes.
 *  -  `options` reference changes.
 *  -  `fetchOptions?.limit` value changes.
 * @param url
 * @param options
 * @param fetchOptions
 */
function useApiFetch<T>(
    url: string,
    options?: RequestInit,
    fetchOptions?: UseApiFetchOptions
) {
    // main fetch variables
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // rate-limiting
    const requestCount = useRef<number>(0);
    const startTime = useRef<Date | null>(null);

    // fetchData will be recalled between renders
    const fetchData = useCallback(async () => {
        setLoading(true);

        // Implement rate limiting
        const currentTime = new Date();
        if (startTime.current) {
            const timeDiff = (currentTime.getTime() - startTime.current.getTime()) / 60000; // in minutes
            if (timeDiff < 1 && requestCount.current >= (fetchOptions?.limit || 60)) {
                setError('Rate limit exceeded. Try again later.');
                setLoading(false);
                return;
            }

            if (timeDiff >= 1) {
                // Reset rate limiting
                startTime.current = currentTime;
                requestCount.current = 0;
            }
        } else {
            startTime.current = new Date();
        }

        // all behavior related to the request is held in the try/catch/finally
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(response.statusText);

            const responseData: ApiResponse<T> = await response.json();

            if (responseData.error) throw new Error(responseData.error);

            setData(responseData.data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
            requestCount.current += 1;
        }

        // check the difference for deps check: value, ref, value.
    }, [url, options, fetchOptions?.limit]);

    // side effect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, loading, error, refetch: fetchData};
}

export default useApiFetch;
