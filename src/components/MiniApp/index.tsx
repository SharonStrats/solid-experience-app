import React, {useState, useEffect} from 'react';
import styles from './MiniApp.module.css';
import Header from '../UI/Header'

// We should also be able to open this in a new window not just as a mini app...

// @ts-ignore
const MiniApp = (props) => {
    const [position, setPosition] = useState({ x: props.positionX, y: props.positionY})
    // @ts-ignore
    const onDragEndHandler = ({clientX, clientY}) => {
        setPosition({ x: clientX, y: clientY })
    }

    useEffect(() => {
       //
    }, [position])

    return (
        <div style={{top: position.y, left: position.x}} draggable="true"  onDragEnd={onDragEndHandler} className={styles.container}>
            <Header icon={props.icon} name={props.name} navItems={props.navItems} backgroundColor='background-purple-lt'/>
            { props.children }
        </div>
    )
}

export default MiniApp;