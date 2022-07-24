import Container from '../../../../components/UI/Container';
import Card from '../../../../components/UI/Card';

const individuals = [
    {
        id: 1,
        name: 'Sally',
    },
    {
        id: 2,
        name: 'Dimitri',
    },
    {
        id: 3,
        name: 'Alexia',
    },
    {
        id: 4,
        name: 'Sophia'
    }];
const Individuals = () => {
    return (
        <Container icon='person' name='Individuals' navItems={null} backgroundColor='background-aqua-lt'>
            <ul>
                {individuals.map(individual => {
                    return (
                        <Card key={individual.id}>
                            {individual.name}
                        </Card>
                    )
                })}
            </ul>
        </Container>)
}

export default Individuals;