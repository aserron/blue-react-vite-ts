import {Images} from "../../gif_api.interface.ts";
import ('./GifImage.css')
export function GifImage({downsized}: Images) {
    return <a target="_blank" href="img_forest.jpg">
        <img className="th" src={downsized.url} width={"100px"} height={"100px"} />
        </a>


}
