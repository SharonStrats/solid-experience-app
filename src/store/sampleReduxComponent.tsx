import { useSelector, useDispatch } from 'react-redux'
import classes from "*.module.css";

const Counter = () => {
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter)

    const incrementHandler = () => {
        dispatch({ type: "increment", amount: 5})
    }

    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={toggleCounterHandler}></button>
        </main>
    )
}

export default Counter