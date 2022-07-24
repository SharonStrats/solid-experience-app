import classes from './lists.module.css'
import Button from "../../../components/UI/Button";

// @ts-ignore
const onAddTaskListClickHandler = async (event) =>{
    console.log('I have been clicked!')

    //const me = new NamedNode('https://sstratsianis.solidcommunity.net/profile/card#me')
    // check if they have a tracker container
    // if not add the container, if so then
    // ask the user for a name for the taskList
    // and render the name
}

const Lists = () => {
    return (
        <div className={classes.container}>
            just to see what happens
            <Button type="button" onClick={onAddTaskListClickHandler} >
                New List
            </Button>
        </div>
    )
}

export default Lists;