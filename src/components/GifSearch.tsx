import {useState} from "react";

interface SearchProps {
    onSearch: (query: string) => void,
}

export function GifSearch({onSearch}: SearchProps) {

    const [query, setQuery] = useState('')

    const hdlOnChange = (ev: InputEvent) => {

        ev.preventDefault();

        setQuery((prev) => {
            return ev.target.value
        })
    }

    const hdlOnSubmit = (ev: InputEvent) => {
        ev.preventDefault();
        console.warn(`search = ${query}`)
        onSearch(query);
    }

    return <section>
        <form onClick={hdlOnSubmit}>
            <input type="text" onChange={hdlOnChange}/>
            <button type="submit" onClick={hdlOnSubmit}>Search</button>
        </form>

    </section>;
}
