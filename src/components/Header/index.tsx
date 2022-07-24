import React from 'react';
import Link from "next/link";
import styles from './Header.module.css';
import {Login} from "../Login";
import Image from "next/image";
import {Logout} from "../Logout";
import {useSession} from "../../hooks/useSession";

const Header = () => {
    const { session } = useSession();
    console.log(session)
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
            <object data="/solid.svg"  width={200} height={250} >
            </object>
          </div>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    {session.info.isLoggedIn ? (
                        <Link href={"Logout"}>
                            <li>
                                <Logout />
                            </li>
                        </Link>) : (
                        <Link href={"Login"}>
                            <li>
                                <Login />
                            </li>
                        </Link> )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;