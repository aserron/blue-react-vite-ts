import useFetchApi from "../hooks/useFetchApi.ts";
import {Datum, Images} from "../gif_api.interface.ts";
import {useState} from "react";
import {GifImage} from "./GifImage/GifImage.tsx";


function GifItem(images:Images) {
    return <li>
                <GifImage {...images} />
            </li>
}


interface FetchParams {
    api_key: string;
    q: string;
    limit: number;
    offset: number;
}

export function GifList({query}) {

    console.info(`[GifList] onRender query=%s`,query)

    const [endpoint, setEndpoint] = useState<string>(`search`);
    const [baseUrl, setBaseUrl]   = useState<string>(`https://api.giphy.com/v1/gifs/`);

    let pager={
        limit        :20,
        initialOffset:0
    };

    const params: FetchParams = {
        api_key     : `pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa`,
        q           : query || `no-query`,
        limit       : 20,
        offset      : 0
    };


    const {data, loading, error, handleNext, handlePrevious} = useFetchApi<Datum>(baseUrl,endpoint,query,pager,params);


    const gif = {
        url:`https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2tjMXh5cjVyc2xxaWh0ZjBwbWpxMjFkcW8xN2E4Z3dsZTA3Y296aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YsTs5ltWtEhnq/giphy.gif`
    }

    const arr = [gif,gif,gif];

    if(!data || data.data.length===0) return null;

    return <>
        {data.data.map((it,idx) => {
            return <GifItem key={`idx${idx}`} {...it.images} />
        })}

    </>


}
