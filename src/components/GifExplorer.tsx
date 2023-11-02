/* eslint-disable @typescript-eslint/no-unused-vars */
import {ReactNode, useCallback, useMemo, useState} from "react";
import {GifSearch} from "./GifSearch.tsx";
import {GifList} from "./GifList.tsx";

export function GifExplorer(props: { children: ReactNode }) {

    const [query, setQuery] = useState('')

    const onSearch = useCallback((newQuery: string) => {
        console.info(newQuery);
        setQuery((prev) => {
            return newQuery
        })
    },[])

    const MemoGifAlbum = useMemo(
        () => <GifList query={query}/>,
        [query]
    )
    return <>
        <GifSearch onSearch={onSearch}/>
        {MemoGifAlbum}

    </>;
}
