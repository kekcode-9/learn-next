import Head from 'next/head';
import Link from 'next/link';
import Layout, { SITE_TITLE } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostData } from '../lib/posts';

export async function getStaticProps () {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData
    }
  }
}

/**
 * The blog posts in our example will be stored as local markdown 
 * files in our application's directory (not fetched from an external 
 * data source), so we'll need to read the data from the file system.
 */

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>
          {SITE_TITLE}
        </title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Somebody shoot me please</p>
        <p>
          Of course I don't want to do this but I'm poor so yeah.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}> Blog </h2>
        <ul className={utilStyles.list}>
          {
            allPostsData.map(({id, date, title}) => {
              return (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}> { title } </Link>
                  <br/>
                </li>
              )
            })
          }
        </ul>
      </section>
    </Layout>
  );
}
