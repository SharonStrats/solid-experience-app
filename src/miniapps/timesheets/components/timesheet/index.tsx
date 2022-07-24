import styles from './Timesheet.module.css';
// dynamically figure out dates for headers

import Table, {TableProps} from "../../../../components/UI/Table";

//beginDate={timesheetData.beginDate} endDate={timesheetData.endDate}
// @ts-ignore
const Timesheet = (props: TableProps) => {
  const timesheetData: TableProps = {
    caption: 'Time sheet data',
  }

  return (
      <Table caption={timesheetData.caption}  />
  )
}

export default Timesheet;
