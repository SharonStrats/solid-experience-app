
export interface TableDataProps {

}

export interface TableProps {
    caption: string

}

// @ts-ignore
const Table = (props:TableProps) => {
   return (
       <table>
           <caption>{props.caption}</caption>
       </table>
   )
}

export default Table;