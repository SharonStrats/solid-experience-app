import Container from '../UI/Container';

// Here we can also do settings and acl.. sharing..
const navItems: never[] = []

// @ts-ignore
const onDropHandler = (event) => {
    alert('you dropped something on me')
    console.dir(event)
}

const Today = () => {

    return (
        <Container icon='today' name='Today' navItem={navItems} onDropHandler={onDropHandler} backgroundColor='background-red' >
            <h2>Today</h2>
            <ul>
                <li> Drag anything here to change the date to today and put it on your list.</li>
            </ul>
        </Container>)
}

export default Today;