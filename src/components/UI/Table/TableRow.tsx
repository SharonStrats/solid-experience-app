Project, Task, date, date
Solid, Create a table, 2.5, 2.4

// need to know solid shoudl be a tr and 2.5
// @ts-ignore
const TableRow = (props) => {
    return (
        <tr>
            <th>Project</th>
            <th>Task</th>
            <td>3.5</td>
            <td>2.5</td>
        </tr>
    )
}

export default TableRow;