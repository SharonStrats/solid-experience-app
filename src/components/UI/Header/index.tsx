import React from 'react';
import Link from "next/link";
import styles from './Header.module.css';
import Nav from "../Nav";
// should also have a delete, so remove the container
// to readd you would do it from the main header
// Need to do the nav properly when you click the icon you see the options..
// @ts-ignore
const Header = (props) => {
    return (
        <header className={`${styles.header} ${props.backgroundColor}`}>
            <div className={styles.logo}>
                <i className={`material-icons ${styles.icon__identifier}`} >{props.icon}</i>
            </div>
            <h2>{props.name}</h2>
            <i className={`material-icons ${styles.icon__menu}`} onClick={()=> alert('I have been clicked')}>menu</i>
        </header>
    )
}
//  <Nav navItems={props.navItems}></Nav>
export default Header;