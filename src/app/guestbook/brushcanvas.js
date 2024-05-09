"use client"
import styles from "@/app/guestbook/page.module.css";
import { useEffect, useRef, useState } from "react";
import { palette } from "./colorlist";
import { BG_COLOR } from "./backcolor";
import DrawCanvas from "./drawcanvas";

export default function BrushCanvas() {

    const [selected, setSelected] = useState('#ff004c');
    const [brushSize, setBrushSize] = useState(30);
    const [holder, setHolder] = useState(null);

    const canvasHolderRef = useRef();
    const drawCanvasHolderRef = useRef();
    const canvasRef = useRef();

    const drawCircle = (ctx, x, y, radius, fill, stroke, strokeWidth) =>{
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        if (fill) {
            ctx.fillStyle = fill
            ctx.fill()
        }
        if (stroke) {
            ctx.lineWidth = strokeWidth
            ctx.strokeStyle = stroke
            ctx.stroke()
        }
    }

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const handleBiger = () => {
        if(brushSize < 100){
            setBrushSize(prev => prev + 5);
        }
    }   

    const handleSmaller = () => {
        if(brushSize > 5){
            setBrushSize(prev => prev - 5);
        }
    }

    const handleApply = () => {

    }

    useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');

        const canvasHolder = canvasHolderRef.current;
        const canvasSize = (canvasHolder.clientWidth > canvasHolder.clientHeight) ? canvasHolder.clientHeight : canvasHolder.clientWidth;
        
        canvasRef.current.height = canvasSize;
        canvasRef.current.width = canvasSize;

        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        drawCircle(ctx, canvasSize / 2, canvasSize / 2, brushSize, selected)

    },[selected, brushSize])

    useEffect(()=>{
        if(drawCanvasHolderRef.current){
            setHolder(drawCanvasHolderRef.current)
        }
    },[drawCanvasHolderRef])

    return(
        <>
            <div>
                <div ref={canvasHolderRef} className={styles.brushcanvasholder}>
                    <canvas id="brushviewer" ref={canvasRef} className={styles.brushviewer}></canvas>
                    <div className={styles.controlpannel}>
                        <button className={styles.submitimg} onClick={handleApply}>적용</button>
                        <button className={styles.plus} onClick={handleBiger}>크게</button>
                        <button className={styles.minus} onClick={handleSmaller}>작게</button>
                    </div>
                </div>
                <ul className={styles.palette}>
                    {palette.map((e,i)=>(
                        <li key={i}>
                            <input style={{display: "none"}} type="radio" name="palette" id={e.id} checked={selected === e.color} defaultValue={e.color} onChange={handleChange}></input>
                            <label htmlFor={e.id} style={{backgroundColor: e.color}}></label>
                        </li>
                    ))}
                </ul>
            </div>

            <div ref={drawCanvasHolderRef} className={styles.drawcanvasholder}>
                {holder && <DrawCanvas holder={holder} brushSize={brushSize} color={selected}/>}    
            </div>
        </>
    )
}