import MiniApp from "../../components/MiniApp";
import Timesheet from "./components/timesheet";

const navItems = [
    {
        id: '1',
        name: 'groups',
        href: '/groups'
    },
    {
        id: '2',
        name: 'individual',
        href: '/individual'
    }
]

const TimesheetsApp = () => {
    return (
        <MiniApp icon='timer' name='Timesheets' navItems={navItems} positionX={600} positionY={600}>
            <Timesheet />
        </MiniApp>
    )
}

export default TimesheetsApp;