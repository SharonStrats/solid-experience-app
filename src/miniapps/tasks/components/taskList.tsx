import classes from './taskList.module.css'

// @ts-ignore
const taskList = (props) => {

    return (
        <div className={classes.container}>
            <ul>
            {props.tasks.map(task => {
                return (
                    <li key={task.id}>
                        <div >
                            {task.name}
                        </div>
                    </li>
                )
            })}
            </ul>
        Here we should be able to add more tasks for the list it is in...
        </div>
    )
}

export default taskList;