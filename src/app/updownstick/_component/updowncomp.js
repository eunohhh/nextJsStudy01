"use client"
import styles from "../page.module.css"
import { useState, useRef } from "react";

export default function UpdownComp () {

    const [isDragging, setIsDragging] = useState(false);
    const dragItem = useRef();

    const onMouseDown = (e) => {
        setIsDragging(true);
    };

    const onMouseUp = () => {
        setIsDragging(false);
        dragItem.current.style.top = '35%'
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        dragItem.current.style.top = '35%'
    };

    const onMouseMove = (e) => {
        e.preventDefault();

        let currentTop = parseInt(dragItem.current.style.top, 10); // 'px' 단위 제거하고 숫자로 변환
        if(!isDragging) return;
        if(e.movementY < 0){
            if(dragItem.current.style.top === "0%") return;
            dragItem.current.style.top = `${currentTop - 1}%`; // 위로
        }else{
            if(dragItem.current.style.top === "65%") return;
            dragItem.current.style.top = `${currentTop + 1}%`; // 아래로
        }
        
    };

        //getComputedStyle(dragItem.current).top

    return(
        <div
            style={{
                position: "relative",
                width : "100vw",
                height : "100vh"
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
        >
            <div className={styles.udjoybox}>
                <div 
                    ref={dragItem} 
                    style={{top: "35%"}}
                    className={styles.udjoystick}
                    onMouseDown={onMouseDown}
                ></div>
            </div>
        </div>
    )
}

// function getAbsoluteTop(element) { 
//     return window.scrollY + element.getBoundingClientRect().top;
// }

// const parentElement = element.parentElement;
// const parentAbsoluteTop = getAbsoluteTop(parentElement);
// const absoulteTop = getAbsoluteTop(element);
// const relativeTop = absoluteTop - parentAbsoluteTop;