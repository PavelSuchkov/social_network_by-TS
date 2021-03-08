import preloader_spinner from "../../../assets/images/preloader_spinner.svg";
import React from "react";


export const Preloader = () => {
    return <div>
    <img src={preloader_spinner} style={ {width: 50, backgroundColor: "transparent"} }/>
</div>
}