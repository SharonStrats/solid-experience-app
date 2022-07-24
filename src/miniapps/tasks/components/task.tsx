import styles from './Task.module.css';

// @ts-ignore
const Task = (props) => {
    return (
        <form className={styles.task}>
            <label>
                Date
                <input type='date' />
            </label>
            <label>
                Name
                <input type='text' />
            </label>
            <label>
                Complete
                <input type='checkbox' />
            </label>
        </form>
    )
}

export default Task;