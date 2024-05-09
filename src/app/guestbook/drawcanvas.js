"use client"
import styles from "@/app/guestbook/page.module.css";
import { useEffect, useRef, useState } from "react";
import { BG_COLOR } from "./backcolor";

export default function DrawCanvas({holder, brushSize, color}) {

    const [drawing, setDrawing] = useState(false);
    const [context, setContext] = useState(null);

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

    const handleDrawingStart = () => {
        if (!drawing) {
            setDrawing(true);
        }
    };

    const handleDrawing = (event) => {
        if (drawing && context) {
            const { offsetX, offsetY } = event.nativeEvent;
            drawCircle(context, offsetX, offsetY, brushSize, color)
        }
    };

    const handleDrawingEnd = () => {
        if (drawing) {
            setDrawing(false);
        }
    };

    useEffect(()=>{

        const ctx = canvasRef.current.getContext('2d');

        setContext(ctx);

        const canvasHolder = holder;
        const canvasSize = (canvasHolder.clientWidth > canvasHolder.clientHeight) ? canvasHolder.clientHeight : canvasHolder.clientWidth;
        
        canvasRef.current.height = canvasSize;
        canvasRef.current.width = canvasSize;

        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvasSize, canvasSize);

    },[holder])

    return(
        <canvas 
            id="drawcanvas" 
            ref={canvasRef} 
            className={styles.drawcanvas}
            onMouseDown={handleDrawingStart} 
            onMouseUp={handleDrawingEnd} 
            onPointerMove={handleDrawing}
            onTouchStart={handleDrawingStart}
            onTouchEnd={handleDrawingEnd}
        ></canvas>
    )
}