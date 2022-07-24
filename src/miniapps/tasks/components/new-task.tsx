import styles from './Task.module.css';
import {useRouter} from "next/router";

// @ts-ignore

const NewTask = (props) => {
    const router = useRouter()

    const addTaskHandler = async (enteredTaskData) => {
        const response = await fetch('/api/new-task', {
            method: 'POST',
            body: JSON.stringify(enteredTaskData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()

        console.log(data)

        await router.replace('/') // this isn't the right path, check that
        // also you can use push or replace look into them one prevents the user from hitting back button
    }

    return (
        <form className={styles.task} onAddTask={addTaskHandler}>
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

export default NewTask;