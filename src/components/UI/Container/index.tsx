import styles from './Container.module.css';
import Header from "../Header";

// @ts-ignore
const Container = props => {
    return (
        <div className={styles.container} onDrop={props.onDropHandler}>
            <Header icon={props.icon} name={props.name} navItems={props.navItems} backgroundColor={props.backgroundColor}/>
            {props.children}
        </div>
    )
}

export default Container;