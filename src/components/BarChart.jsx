import React, { useRef, useEffect } from 'react';

const BarChart = ({ data, width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, width, height);

        // Set up chart dimensions and styles
        const barWidth = width / data.length * .94;
        const maxBarHeight = height * 0.8;
        const margin = 5;
        const barMarginLeft = 22;
        const axisMargin = 20;

        // Find the maximum data value to scale the bars accordingly
        const maxDataValue = Math.max(...data.map(d => d.value));

        // Draw x-axis labels
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        data.forEach((item, index) => {
            const x = index * barWidth + barWidth / 2;
            const y = height - axisMargin / 3;
            ctx.fillText(item.label, x, y);
        });

        // Draw y-axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= 5; i++) {
            const label = Math.round(maxDataValue * (i / 5));
            const x = margin * 3;
            const y = height - ((maxBarHeight / 5) * i + axisMargin);
            ctx.fillText(label.toString(), x, y);
        }

        // Draw each bar
        data.forEach((item, index) => {
            const barHeight = (item.value / maxDataValue) * maxBarHeight;
            const x = index * barWidth + margin + barMarginLeft;
            const y = height - barHeight - axisMargin;

            // Draw the bar
            ctx.fillStyle = item.color || 'blue';
            ctx.fillRect(x, y, barWidth - margin * 2, barHeight);
        });

    }, [data, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BarChart;
