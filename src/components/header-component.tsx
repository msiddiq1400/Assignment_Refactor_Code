import * as React from "react";
import styles from "../shopApp.module.css";
import logo from "../images/droppe-logo.png";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";

export const HeaderComponent = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={['container', styles.headerImageWrapper].join(' ')}>
                    <img src={logo} className={styles.headerImage} alt="logo.png"/>
                </div>
            </div>

            <>
                <span
                    className={['container', styles.main].join(' ')}
                    style={{margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly'}}
                >
                    <img src={img1} style={{maxHeight: "15em", display: 'block'}} alt="img1.png"/>
                    <img src={img2} style={{maxHeight: "15rem", display: 'block'}} alt="img2.png"/>
                </span>
            </>
        </>
    );
}