import {useCallback, useState} from "react";

interface SearchProps {
    onSearch: (query: string) => void,
}

export function GifSearch({onSearch}: SearchProps) {

    const [query, setQuery] = useState('')

    const hdlOnChange = (s:'') => {

        // ev.preventDefault();

        setQuery((prev) => {
            return s
        })
    }

    const hdlOnSubmit = useCallback((ev) => {
        ev.preventDefault();
        console.warn(`search = ${query}`)
        onSearch(query);
    },[query])

    return <section className={"search"}>
        <form onClick={hdlOnSubmit}>
            <input type="text" onChange={(ev: InputEvent)=>hdlOnChange(ev.currentTarget.value)}/>
            <button type="submit" onClick={hdlOnSubmit}>Search</button>
        </form>

    </section>;
}
