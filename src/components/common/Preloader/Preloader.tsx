import preloader_spinner from "../../../assets/images/preloader_spinner.svg";
import preloader_gears from "../../../assets/images/preloader_gears.svg";
import React from "react";


export const Preloader = () => {
    return <div>
    <img src={preloader_gears} style={ {width: 100, backgroundColor: "transparent"} }/>
</div>
}