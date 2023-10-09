import "./SimpleChart.css";
import { useEffect, useRef, useState } from "react";

interface SimpleChartProps {
    readonly title: string
    readonly data: number[]
    readonly lineColor?:string
    readonly dataOffset?: number
    readonly width?: number
    readonly height?: number
}

export function SimpleChart(props: SimpleChartProps) {
    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const lineColor = props.lineColor ?? '#000000';

    useEffect(() => {
        if (!canvasRef.current) return;
        const data = props.data;
        const dataMax = Math.max(...data) - (props.dataOffset ?? 0);
        //const dataMin = Math.min(...data)
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        console.log(ctx);
        
        ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, (1-(data[0] / dataMax)) * canvasHeight);
        for (let i = 0; i < data.length; i++) {
            const y = data[i] - (props.dataOffset ?? 0);
            const mappedY =  (1-(y / dataMax)) * canvasHeight;
            const mappedX = (i / (data.length-1)) * canvasWidth;
            ctx.lineTo(mappedX, mappedY);
        }
        ctx.stroke();
        ctx.strokeStyle = "#242424";
        ctx.lineWidth = 8;
        ctx.fillStyle = lineColor;
        ctx.font = "16pt Arial";
        ctx.strokeText(props.title, 0, canvasHeight);
        ctx.fillText(props.title, 0, canvasHeight);
        
    }, [canvasHeight, canvasWidth, lineColor, props.data, props.dataOffset, props.title]);

    useEffect(() => {
        if (wrapperRef.current == null) return
        const width = wrapperRef.current?.clientWidth;
        const height = wrapperRef.current?.clientHeight;
        setCanvasWidth(width)
        setCanvasHeight(height)
    }, [wrapperRef]);
    
    return (
        <div className="simple-chart" ref={wrapperRef} style={{
            width: (props.width) ? props.width + "px" : "100%",
            height: (props.height) ? props.height + "px" : "100%"
        }}>
            <canvas className="simple-chart-canvas" ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    );
}

export default SimpleChart;