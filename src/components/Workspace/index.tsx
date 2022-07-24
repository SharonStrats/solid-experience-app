import styles from './Workspace.module.css';
import Container from '../UI/Container';

// Here we can also do settings and acl.. sharing..
const navItems: never[] = []

// @ts-ignore
const onDropHandler = (event) => {
    alert('you dropped something on me')
    console.dir(event)
}

const Workspace = () => {

    return (
        <Container icon='work' name='Workspace' navItem={navItems} onDropHandler={onDropHandler} backgroundColor='background-yellow' >
            <h2>Workspace</h2>
            <ul>
                <li> Drag anything here to add or update data.</li>
            </ul>
        </Container>)
}

export default Workspace;