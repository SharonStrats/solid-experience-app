import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ContactsApp from "../src/miniapps/contacts";
import {useSession} from "../src/hooks/useSession";
import Workspace from "../src/components/Workspace";
import BookmarksApp from "../src/miniapps/bookmarks";
import SchedulingApp from "../src/miniapps/scheduling";
import TimesheetsApp from "../src/miniapps/timesheets";
import TasksApp from "../src/miniapps/tasks";
import Today from "../src/components/Today";
/*
Make the little live tutorial like other apps showing what you can do...
 */

/* need to think about where to put this as it might be good if there were separate pages... */
export const  getStaticProps = async () => {
    // fetch task data from an api...
    // get the data
    const tasks: [] = []
    // watch video do see what is revalidate...
    return {
        props: {
            tasks
        },
        revalidate: 1
    }
}

const Home: NextPage = () => {
  const { session } = useSession();
/*
  if (!session.info.isLoggedIn) {
      return <p className={styles.unauthenticatedView}>Please login to Experience your data on Solid</p>
  } */
    // viewport meta is saying that we have good mobile css so the device doesn't need to scale to 1000 and
    // then scale down and initial scale 1 says don't zoom in or zoom out to start
    // Also in algoexpert frontend html there is a great accessibilty video - watch and apply at a later time
  return (
    <div draggable="true" className={styles.container}>
      <Head>
        <title>Solid - Experience Your Data</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name="description" content="The Solid Experience" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel='icon' href='favicon.ico' />
      </Head>


      <main className={styles.main}  >
          <h1 className={styles.title}>
              The Solid Experience
          </h1>

          <div>
              <a href='https://miro.com/app/board/uXjVOaXGmLc=/'>Miro Board Project Tasks and Ideas</a>
              <ContactsApp />
              <BookmarksApp />
              <SchedulingApp />
              <TimesheetsApp />
              <TasksApp />
              <Today />
              <Workspace />
          </div>
      </main>



        <div className={styles.grid}>

        </div>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={130} height={145} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
