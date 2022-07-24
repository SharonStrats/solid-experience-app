import styles from './Nav.module.css';
import Link from "next/link";
import React, {useState} from "react";

const Nav = (props: { active: any; navItems: any[]; }) => {
    const [active, setActive] = useState(props.active)

    return (
        <nav className={styles.nav}>
            <ul className={styles.menu}>
                {props.navItems.map(item => {
                    return <Link key={item.id} href={item.href} >
                        <li>
                            { item.name}
                        </li>
                    </Link>
                })
          }
            </ul>
        </nav>
    )
}

export default Nav;