/* In the higher level component you can use state with fileredYear lets say
then pass a function filterChangeHandler as a prop which calls the state update function
then pass it as props call it here
* */
const ExpenseFilter = (props: { onChangeFilter: (arg0: any) => void; selected: string | number | readonly string[] | undefined; }) => {


    const dropdownChangeHandler = (event: { target: { value: any; }; }) => {
        props.onChangeFilter(event.target.value);
    }

    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                <select value={props.selected} onChange={dropdownChangeHandler}>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                </select>
            </div>
        </div>
    )
}