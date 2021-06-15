import preloader_spinner from "../../../assets/images/preloader_spinner.svg";
import React from "react";


export const Preloader = () => {
    return <div style={{position: "fixed", top: "50%", textAlign: "center", width: "55%"}}>
        <img src={preloader_spinner} style={{width: 100, backgroundColor: "transparent"}}/>
    </div>
}