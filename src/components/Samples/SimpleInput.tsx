import { useRef, useState } from 'react'
// useState can be used to capture input keystroke by keystroke
// useRef can be used to capture the input at the end.
// usually you would pick one of these
// TAKE OUT ALL THE USEREF DON'T NEED THIS
const SimpleInput = (props: any) => {
    // const nameInputRef = useRef('');
    const [ enteredName, setEnteredName] = useState('');
    //const [ enteredNameIsValid, setEnteredNameIsValid] = useState(true) // change this to invalid
    // and add a touched, that way you can use these both in useEffect later....
    const [ enteredNameIsTouched, setEnteredNameIsTouched] = useState(false)

    const enteredNameIsValid =  enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value)
    }

    const nameInputBlurHandler = event => {
        setEnteredNameIsTouched(true)
    }

    const formSubmissionHandler = event => {
        event.preventDefault(); // prevents the http req from being automatically sent (form + button does this)

       if (!enteredNameIsValid) {
            return;
        }
        /*
         setEnteredNameIsValid(true)
         const enteredValue = nameInputRef.current.value */

        setEnteredNameIsTouched(true)
        // setEnteredNameIsValid(true)
        setEnteredName('')
        setEnteredNameIsTouched(false)
    }


    const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid'

    let form = <>
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    // ref={nameInputRef}
                    type='text' id='name'
                    onChange={nameInputChangeHandler}
                value={enteredName}/>
                {!enteredNameIsValid && <p className='error-text'>Name must not be empty.</p>}
            </div>
            <div className='form-actions'>
                <button>Submit</button>
            </div>
        </form>
    </>;
    return form
}