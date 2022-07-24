import React, { useState } from 'react';

// you can set styles dynamically by
// <label style={{color: !isValid ? 'red' : ''}}>Course Goal</label>
// you can also do <div className={`form-color ${!isValid ? 'invalid : ''}`}

// 2 way binding both listen and react to entered data
// pass data up....the Handler functions should be in higher component and passed as props
const ExpenseForm = () => {
    // many use the multi-state approach instead...
    const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: '',
    })

    const titleChangeHandler = (event: { target: { value: any; }; }) => {

        setUserInput((prevState) => {
            return {
                ...prevState,
                enteredTitle: event.target.value,
            }
        } )
    }

    // by default target.value is always a string, even if input type is a number
    const amountChangeHandler = (event: { target: { value: any; }; }) => {
        /* don't do it like this, instead do it in a function so that the update can be scheduled.
        otherwise there might end up being a problem
        setUserInput({
            ...userInput,
            enteredAmount: event.target.value,
        }) */
    }

    const dateChangeHandler = (event: { target: { value: any; }; }) => {
        setUserInput({
            ...userInput,
            enteredDate: event.target.value,
        })
        setUserInput((prevState) => {
            return {
                enteredAmount: '',
                enteredTitle: '',
                enteredDate: '',
            }
        } )
    }

    const submitHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const expenseData = {
            title: userInput.enteredTitle,
            amount: userInput.enteredAmount,
            date: new Date(userInput.enteredDate)
        }

    }

    return (
     <form onSubmit={submitHandler}>
         <div className='new-expense__controls'>
             <div className='new-expense__control'>
                 <label>Title</label>
                 <input type='text' value={userInput.enteredTitle} onChange={titleChangeHandler}/>
             </div>
             <div className='new-expense__control'>
                 <label>Amount</label>
                 <input type='number' value={userInput.enteredAmount}  onChange={amountChangeHandler} min='0.01' step='0.01'  />
             </div>
             <div className='new-expense__control'>
                 <label>Date</label>
                 <input type='date' value={userInput.enteredDate}  onChange={dateChangeHandler} min='2019-01-01' max='2022-12-31' />
             </div>
         </div>
         <div className='new-expense__actions'>
             <button type='submit'>Add Expense</button>
         </div>
     </form>
    )
}

export default ExpenseForm;