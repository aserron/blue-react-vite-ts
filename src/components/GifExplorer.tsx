/* eslint-disable @typescript-eslint/no-unused-vars */
import {ReactNode, useMemo, useState} from "react";
import {GifSearch} from "./GifSearch.tsx";
import {GifList} from "./GifList.tsx";

export function GifExplorer(props: { onSearch: any, query: string, children: ReactNode }) {

    const [query, setQuery] = useState('')

    const onSearch = (newQuery: string) => {
        console.info(newQuery);
        setQuery((prev) => {
            return newQuery
        })
    }

    const MemoGifSearch = useMemo(
        () => <GifList query={query}/>,
        [query]
    )
    return <>
        <GifSearch onSearch={onSearch}/>
        {MemoGifSearch}

    </>;
}
