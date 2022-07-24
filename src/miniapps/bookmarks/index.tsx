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

const BookmarksApp = () => {
    return (
        <MiniApp icon='bookmarks' name='Bookmarks' navItems={navItems} positionX={800} positionY={800} >
            <h2>Add a book mark</h2>
            <p>Search through</p>
            <ul>
                <li>Add key words to your bookmarks to find them later.</li>
                <li>Also add comments and notes about them.</li>
            </ul>
        </MiniApp>
    )
}

export default BookmarksApp;