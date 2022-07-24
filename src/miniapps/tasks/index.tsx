import {useCallback, useEffect, useState} from "react";
import MiniApp from "../../components/MiniApp";
import TaskList from "./components/taskList";
import Lists from './components/lists'
import Button from "../../components/UI/Button";
import { store } from 'solid-logic'
import { rdf } from 'solid-ui'
import {NamedNode} from "rdflib";
import {getProfileAll, ProfileAll, SolidDataset, UrlString, WithResourceInfo} from "@inrupt/solid-client";
import {useSession} from "../../hooks/useSession";
import {LinkedResourceUrlAll} from "@inrupt/solid-client/dist/interfaces";
import {tasks} from "./task";
import classes from "./Tasks.module.css";

// to get all the tasks you should use getStaticProps()

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



// @ts-ignore
const TasksApp = (props) => {
    // const { data: profile } = useAuthenticatedProfile();
    const [profiles, setProfiles ] = useState([])
    const { session, fetch } = useSession();
   const getProfiles = useCallback(async (session: any, fetch: any) => {
        if (session.info?.webId) {
            const allProfiles = await getProfileAll(session.info?.webId, { fetch });
            console.log('all profiles ' + JSON.stringify(allProfiles))
            // @ts-ignore
            setProfiles(allProfiles)
        }

    }, [session.info.webId])

        useEffect(() => {
            getProfiles(session, fetch).then(r => console.log('hello'));
        },[session.info.webId])


    return (

        <MiniApp icon='task' name='Tasks' navItems={navItems} positionX={1000} positionY={600}  >
            <div className={classes.container}>
                <p className={classes.header}> I am a header </p>

                <Lists />
                <TaskList tasks={tasks}/>
            </div>
        </MiniApp>
    )
}

export default TasksApp;