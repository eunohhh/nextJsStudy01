import axios from "axios"
import Config from "../../../config/config.export";

async function getData(){
    try {
        // 개발모드인지 프로덕션인지 콘솔에 출력
        // console.log(Config().mode) 

        // 모드에 따라서 baseUrl 설정
        // npm i env-cmd 설치해야함
        // package.json 수정, 원하는 모드에 env-cmd -f .env.모드 추가. 예시) "env-cmd -f .env.development next dev",
        // https://funveloper.tistory.com/163 참고
        const result = await axios.get(`${Config().baseUrl}/api/firebase`); 
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

export default async function FetchTest(){

    const data = await getData();

    console.log(data)

    return(
        <>
            <h1>테스트중임~~~</h1>
        </>
    )
}