// in the component that calls this.
// setExpenses([expense, ...expenses]) but you really need the function
// setExpenses((prevExpsenses) => { return [expense, ...prevExpenses];});
const Expenses = (props) => {

    return (
        <div>
            {props.items.map((expense) => {
                <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />
            })}
        </div>
    )
}