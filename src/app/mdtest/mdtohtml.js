import { remark } from 'remark';
import html from 'remark-html';

//이름에서 알 수 있듯, 마크다운을 HTML로 변환해주는 함수
export default async function markdownToHtml(markdown) {
    const result = await remark()
        .use(html)
        .process(markdown);
    return result.toString();
}