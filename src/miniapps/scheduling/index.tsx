import MiniApp from "../../components/MiniApp";

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

const SchedulingApp = () => {
    return (
        <MiniApp icon='checklist' name='Scheduling' navItems={navItems} positionX={1500} positionY={600} >
            <h2>Schedule your activities and todos</h2>
        </MiniApp>
    )
}

export default SchedulingApp;