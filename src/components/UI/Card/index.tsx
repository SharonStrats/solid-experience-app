import styles from './Card.module.css';

// @ts-ignore
const Card = (props) => {
    return (
        <div draggable='true' className={styles.card} onDrag={props.onDragHandler} onContextMenu={props.onContextMenuHandler}>
            {props.children}
        </div>
    )
}

export default Card;