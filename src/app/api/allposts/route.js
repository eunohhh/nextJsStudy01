import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'src/markdown'); //루트를 기준으로 _posts폴더 위치 알리기

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

export default async function GET(){

    try{

        const slugs = getPostSlugs();
        const posts = slugs.map((slug) => getPostBySlug(slug, ['slug', 'title', 'author', 'preview', 'date', 'tags']));

        const responseObject = {
            posts : posts
        }

        return Response.json(responseObject, {status :200});

    }catch(error){

        console.log(error)
        return Response.json({ message: "An error occurred"}, {status: 400});
    
    }
}