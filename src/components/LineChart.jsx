import React, { useRef, useEffect } from 'react';

const LineChart = ({ data, width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        const margin = 40;
        const chartHeight = height - margin * 2;
        const chartWidth = width - margin * 2;

        // Determine the maximum data value for scaling
        const maxValue = Math.max(...data.map(d => d.value));
        const yTickCount = 5; // Number of ticks on the y-axis
        const yTickSpacing = maxValue / yTickCount; // Spacing between ticks

        // Draw the x and y axes
        ctx.strokeStyle = '#6984f08c';
        ctx.beginPath();
        ctx.moveTo(margin, height - margin); // Bottom-left corner
        ctx.lineTo(margin, margin); // Top-left corner
        ctx.lineTo(width - margin, margin); // Top-right corner
        ctx.stroke();

        // Draw y-axis ticks and labels
        for (let i = 0; i <= yTickCount; i++) {
            const y = height - margin - (i * chartHeight) / yTickCount;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(margin - 5, y);
            ctx.lineTo(margin, y);
            ctx.stroke();

            // Draw the y-axis labels
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText((i * yTickSpacing).toFixed(0), margin - 10, y + 5);
        }

        const xStep = chartWidth / (data.length - 1);

        // Draw the line connecting the data points
        ctx.strokeStyle = '#770d98d5';
        ctx.beginPath();
        data.forEach((point, index) => {
            const x = margin + index * xStep;
            const y = height - margin - (point.value / maxValue) * chartHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw the data points
        data.forEach((point, index) => {
            const x = margin + index * xStep;
            const y = height - margin - (point.value / maxValue) * chartHeight;

            ctx.fillStyle = '#4d0663e9';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2, true);
            ctx.fill();
        });

        // Draw x-axis labels
        data.forEach((point, index) => {
            const x = margin + index * xStep;
            const y = height - margin - (point.value / maxValue) * chartHeight;

            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(point.label, x, height - margin + 15);
        });
    }, [data, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default LineChart;
