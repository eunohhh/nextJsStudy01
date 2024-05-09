import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const postsDirectory = join(process.cwd(), 'src/markdown'); //루트를 기준으로 markdown 파일들이 있는 폴더 위치 알리기

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields){
    const realSlug = slug.replace(/\.md$/, ''); //파일명
    const fullPath = join(postsDirectory, `${realSlug}.md`); //해당 파일의 위치 찾기
    const fileContents = fs.readFileSync(fullPath, 'utf8'); //파일 가져오기
    const { data, content } = matter(fileContents); //마크다운 to 자바스크립트

    const items = {}; //파일 데이터

    //---에서 설정한 변수 중 인자로 들어온 값만 데이터에 추가
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });

    return items;
}

export function getData(slug){
    const slugs = getPostSlugs(); // 로컬의 모든 md 파일 파일명을 기준으로 배열 생성
    const posts = slugs.map((e) => getPostBySlug(e, ['slug', 'title', 'author', 'preview', 'date', 'tags', 'content'])); // 모든 포스트 자바스크립트 객체화하여 배열로 리턴 

    const post = posts.find((e) => e.slug === slug); // 주어진 slug 에 맞는 객체만 찾아서 리턴

    return post;
}

export default async function MdPageslug({ params }){

    const { slug } = params;

    const post = getData(slug);

    return(
        <div>
            <h3>{post.title}</h3>
            <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} /> 
            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
        </div>
    )
}