import {useState, useEffect, useCallback, EffectCallback} from 'react';

interface GifParams {
    api_key: string;
    q: string;
    limit: number;
    offset: number;
}


// Define a generic type for the hook that will be used to type the response data
type UseFetchApiReturnType<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
    handleNext: () => void;
    handlePrevious: () => void;
};

// Define the shape of the API response you expect
interface ApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// Define the type for the options parameter
interface FetchOptions {
    pageLimit?: number;
    pageOffset?: number;
}

const useFetchApi = <T>(
    baseUrl: string,
    endpoint: string,
    query   : string,
    {pageLimit = 20, initialPageOffset = 0}: FetchOptions = {},
    params: GifParams
): UseFetchApiReturnType<ApiResponse<T>> => {
    const [data, setData] = useState<ApiResponse<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [pageOffset, setPageOffset] = useState<number>(initialPageOffset);

    const {
        api_key,
        limit,
        offset
    } = params;

    const parameters = `limit=${limit}&offset=${offset}&q=${query}&api_key=${api_key}`;

    const fetchData = useCallback(
        async (offset: number) => {
            setLoading(true);
            setError(null);

            const controller = new AbortController();
            const signal = controller.signal;

            try {

                const response = await fetch(`${baseUrl}${endpoint}?${parameters}`, {signal});
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                ;
                const result = await response.json() as ApiResponse<T>;
                setData(result);
            } catch (reason: unknown) {
                if (reason instanceof Error && reason.name !== 'AbortError') {
                    setError(reason);
                } else {
                    new Error('useFetchApi error while fetching', {cause: reason});
                }

            } finally {
                setLoading(false);
            }

            // Cleanup function to abort the request when the component unmounts or when the offset changes
            return () => controller.abort();

        }, [query,baseUrl, endpoint, limit]);

    useEffect(() => {
        // Call fetchData with the current offset
        // const cancelFetch = fetchData(pageOffset);
        fetchData(pageOffset);
        // Cleanup function to cancel the request if the offset changes before the request completes
        return () => {

        };
    }, [fetchData, pageOffset]);
    new Error()
    const handleNext = () => {
        setPageOffset(prevOffset => prevOffset + limit);
    };

    const handlePrevious = () => {
        setPageOffset(prevOffset => Math.max(0, prevOffset - limit));
    };

    return {data, loading, error, handleNext, handlePrevious};
};

export default useFetchApi;
