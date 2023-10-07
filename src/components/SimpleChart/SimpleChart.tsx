import "./SimpleChart.css"
import { useEffect, useRef, useState } from "react"

interface SimpleChartProps {
    title: string
    data: number[]
    lineColor:string
}

export function SimpleChart(props: SimpleChartProps) {
    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null)
    const lineColor = props.lineColor ?? '#000000';
    
    useEffect(() => {
        if (canvasRef.current == null) return;
        const data = props.data;
        const dataMax = Math.max(...data)
        //const dataMin = Math.min(...data)
        const ctx:CanvasRenderingContext2D = canvasRef.current.getContext("2d")!;
        ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, canvasHeight)
        for (let i = 0; i < data.length; i++) {
            const y = data[i];
            const mappedY =  (1-(y / dataMax)) * canvasHeight
            const mappedX = (i / (data.length-1)) * canvasWidth
            ctx.lineTo(mappedX, mappedY);
        }
        ctx.stroke();
        ctx.strokeStyle = "#242424";
        ctx.lineWidth = 8
        ctx.fillStyle = lineColor
        ctx.font = "16pt Arial"
        ctx.strokeText(props.title, 0, canvasHeight)
        ctx.fillText(props.title, 0, canvasHeight)
        
    }, [canvasHeight, canvasWidth, lineColor, props.data, props.title])

    useEffect(() => {
        if (wrapperRef.current == null) return
        const width = wrapperRef.current?.clientWidth;
        const height = wrapperRef.current?.clientHeight;
        setCanvasWidth(width)
        setCanvasHeight(height)
    }, [wrapperRef])
    
    return (
        <div className="simple-chart" ref={wrapperRef}>
            <canvas className="simple-chart-canvas" ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    )
}

export default SimpleChart