import React, { useRef, useEffect } from 'react';

const SparklineChart = ({ data, width, height, color }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        // Determine the maximum and minimum values in the data
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);

        // Calculate the scale factors
        const scaleX = width / (data.length - 1);
        const scaleY = height / (maxValue - minValue);

        // Begin drawing the path
        ctx.beginPath();
        ctx.moveTo(0, height - (data[0] - minValue) * scaleY);

        // Draw the lines for each data point
        data.forEach((value, index) => {
            const x = index * scaleX;
            const y = height - (value - minValue) * scaleY;
            ctx.lineTo(x, y);

            ctx.fillStyle = 'black';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${value}`, x, height + 12);
        });



        // Set the line color
        ctx.strokeStyle = color || 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();

    }, [data, width, height, color]);

    return <canvas ref={canvasRef} width={width} height={height + 15} />;
};

export default SparklineChart;
