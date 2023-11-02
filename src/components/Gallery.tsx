import {LightBox} from "./LightBox/LightBox.tsx";
import {GifExplorer} from "./GifExplorer.tsx";
import './Gallery.css';

export function Gallery() {

    return <>
        <header><h1>Gif Explorer</h1></header>
        <section>

            <GifExplorer />
            <LightBox/>
        </section>
    </>;
}
