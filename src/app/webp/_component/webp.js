"use client"
import { useState } from "react";

const MAX_WIDTH = 1280;
const MAX_HEIGHT = 720;

export default function WebpComp () {

    const [downUrl, setDownUrl] = useState(null);
    const [files, setFiles] = useState(null);

    function convertToWebP(inputFile, maxWidth, maxHeight) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
    
                    // 크기 조정
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
    
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
    
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/webp');
                };
    
                img.onerror = () => {
                    reject(new Error("이미지를 로드하는 데 실패했습니다."));
                };
    
                img.src = e.target.result;
            };
    
            reader.onerror = () => {
                reject(new Error("파일을 읽는 데 실패했습니다."));
            };
    
            reader.readAsDataURL(inputFile);
        });
    };

    const handleClick = async () => {
        if(!files) return;
        
        convertToWebP(files[0], 1280, 720)
            .then((webpBlob) => {
                // webp 파일 사용
                console.log(webpBlob);

                // Blob을 URL로 변환
                const url = URL.createObjectURL(webpBlob);
                setDownUrl(url);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDown = () => {
        // 다운로드 링크 생성
        const downloadLink = document.createElement('a');
        downloadLink.href = downUrl;
        downloadLink.download = "converted-image.webp"; // 다운로드될 파일 이름 설정

        // 링크 클릭 이벤트 발생
        downloadLink.click();
    };

    const handleChange = (e) => {
        const files = e.currentTarget.files;
        if (files) {
            // const fileArray = Array.from(files).map(file => file.name);
            setFiles(files)
            console.log(files[0]);
        }
    }

    return(
        <>
            <input type="file" onChange={handleChange} />
            <button onClick={handleClick}>테스트해봐</button>
            {downUrl && <button onClick={handleDown}>이제 다운 가능</button>}
        </>
    )
}