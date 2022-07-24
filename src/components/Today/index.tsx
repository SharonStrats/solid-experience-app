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

const TodayApp = () => {
    return (
        <MiniApp icon='checklist' name='Today' navItems={navItems} positionX={1000} positionY={700} >
            <h2>Schedule your activities and todos</h2>
        </MiniApp>
    )
}

export default TodayApp;