"use client"
import { useRef, useState } from "react";
import searchdb from "./searchdb";
import Link from "next/link";

// db json 에서 keyword가 콤마로 구분되어 있는 것을 어레이로 바꿔서 검색 기준 어레이 생성 === dbset
const db = searchdb.map((e,i)=>{
    const dbObj = {  // obj copy
        _id : e._id,
        title : e.title,
        keywords : e.keywords.split(","), // original DB is sting, so change to arr
        url : e.url
    };
    return dbObj;
});

const everyKeywords = []; // 키워드만 모음집.. 필요할까???
db.forEach((e,i)=>{
    everyKeywords.push( ...e.keywords );  // 모든 키워드 하나의 어레이에 담기
});

const delRegex = /[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|\r\n]/gim; // 공격방지용 정규식, need del nbsp add \s

export default function SearchTest() {

    const [searchedString, setSearchedString] = useState(null); // 유저가 검색한 값 state
    const [searchResult, setSearchResult] = useState(null); // 유저가 검색한 값을 db와 매치한 검색 결과값 state

    const resultRef = useRef();

    // 검색 기능 함수
    function searching(search){

        if(delRegex.test(search)){ // 이상한거 검색하면

            alert("맞을래?");

        } else if(search.length > 10){ // 10자 이상으로 검색하면

            alert('10자 이내로 검색하세요');

        } else {

            let searchResult = []; // 최종검색결과 담을 어레이
            let nbspSearchArr = []; // 검색겨로가 공백제거하여 담을 어레이

            if(/\s/.test(search)){ // 검색어에 공백이 있으면

                nbspSearchArr = search.split(/\s/); // 공백마다 끊어서 배열에 담기

                nbspSearchArr.forEach((e,i)=>{ // 배열기준으로 반복문 => 여기가 어렵다..
                    const result = db.filter((a)=>{ // 필터 돌려서 모든 검색어 찾아!
                        return a.keywords.includes(e);
                    })

                    searchResult.push(...result) // spread 로 풀어서 찾은 결과를 최종 결과(searchResult)에 담아!
                })

            } else {

                // filter == search !!!!!!처음 할때는 이것만 써서 해볼것!!!!!!!
                searchResult = db.filter((e, i)=>{ 
                    return e.keywords.includes(search);
                })

            }

            if(searchResult.length === 0){ // 검색 결과가 없으면 

                setSearchResult(['검색결과가 없어요 ㅠㅠ']) // 결과보여주는 state 없어요 설정

            }else{

                setSearchResult(searchResult); // 결과보여주는 state 값으로 설정

            }
        }        
    };

    // input 에 값이 입력되면 실행
    const handleInput = (e) => {
        const searched = e.currentTarget.value.toLowerCase(); // (영어라면 소문자로 변경하여) 검색값 변수에 저장 
        setSearchedString(searched); // 검색값으로 setState
    };

    // input 에서 enter 가 입력되면 실행
    const handleKeydown = (e) => {
        if(e.keyCode === 13){ // 엔터 누르면
            e.preventDefault(); // input 의 기본 동작 금지

            if(searchedString){
                // state 이용하여 서치 함수 실행
                searching(searchedString)
            }            

            e.currentTarget.blur(); // input 에서 focus out
        }
    };

    // button 눌리면 실행
    const handleSearchBtn = () => {
        if(searchedString){

            // state 이용하여 서치 함수 실행
            searching(searchedString)

        } else {
            alert('검색어를 입력하세요')
        }
    }

    return(
        <>
            <input type="search" name="search" placeholder="검색..." onInput={handleInput} onKeyDown={handleKeydown}></input>
            <button onClick={handleSearchBtn}>검색</button>

            <div>
                <div>
                    {searchResult && searchResult.map((e,i)=>{
                        return (
                            <Link href={e.url} target="_blank" key={i}>
                                <p ref={resultRef}>{e.title}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

// 1 인풋과 검색버튼을 만든다
// 2 인풋과 검색버튼에 달아줄 핸들러 함수들과 스테이트를 만든다
// 2-1 인풋이 변경되면
// 2-2 엔터를 누르면
// 2-3 검색버튼을 누르면
// 3 검색 함수를 만든다
// 4 엔터를 누르거나 검색버튼을 누르면 검색 함수를 실행한다
// 5 검색 함수의 문제점을 검증한다