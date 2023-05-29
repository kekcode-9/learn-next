import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostData () {
    // get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((file) => {
        // remove .md from the file name to get the id
        const id = file.replace(/\.md$/, '');

        // read the markdown file as a string
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // use gray-matter to parse the post's metadata section
        const matterResults = matter(fileContents);

        // combine the data with the id
        return {
            id,
            ...matterResults.data
        }
    });

    // sort posts by data
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getAllPostIds () {
    const fileNames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((file) => {
        return {
            params: {
                id: file.replace(/\.md$/, '')
            }
        }
    })
}

export function getPostData (id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResults = matter(fileContents);

    // combine the data with the id
    return {
        id,
        ...matterResults.data
    }
}