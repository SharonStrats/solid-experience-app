import Container from '../../../../components/UI/Container';
import Card from '../../../../components/UI/Card';
import {getGroups} from "../../addressBookHelpers";

const groups =  []
   // await getGroups()


// @ts-ignore
const onDragHandler = event => {
    event.stopPropagation();
}

// @ts-ignore
const onContextMenuHandler = event => {
    alert('you have right clicked')
    event.stopPropagation();
}
const Groups = () => {
    return (
        <Container icon='groups' name='Groups' navItems={null} backgroundColor='background-aqua-lt'>
            <ul>
            {groups?.map(group => {
                return (
                    <Card key={group.id} onDragHandler={onDragHandler} onContextMenuHandler={onContextMenuHandler}>
                        {group.name}
                    </Card>
                )
            })}
            </ul>
        </Container>)
}

export default Groups;