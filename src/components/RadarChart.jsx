import React, { useRef, useEffect } from 'react';

const RadarChart = ({ data, width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        const numAxes = data.length;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40; // Reduce radius to account for labels
        const maxValue = Math.max(...data.map(d => d.value));
        const yTickCount = 5; // Number of ticks on the y-axis
        const yTickSpacing = maxValue / yTickCount; // Spacing between ticks

        // Draw the radar chart axes and labels
        for (let i = 0; i < numAxes; i++) {
            const angle = (i * 2 * Math.PI) / numAxes;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();

            // Draw the axis labels
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);

            ctx.fillStyle = 'gba(17, 8, 98, 0.81)';
            ctx.font = '15px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data[i].label, labelX, labelY);
        }

        // Draw y-axis ticks and labels (concentric circles)
        for (let i = 1; i <= yTickCount; i++) {
            const r = (i * radius) / yTickCount;
            ctx.strokeStyle = 'gray';
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
            ctx.stroke();

            // Draw the y-axis labels (only for one axis)
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText((i * yTickSpacing).toFixed(0), centerX - 10, centerY - r);
        }

        // Draw the data polygon
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 'rgba(17, 8, 98, 0.81)';
        ctx.beginPath();
        data.forEach((point, index) => {
            const angle = (index * 2 * Math.PI) / numAxes;
            const x = centerX + (Math.cos(angle) * point.value * radius) / maxValue;
            const y = centerY + (Math.sin(angle) * point.value * radius) / maxValue;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }, [data, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default RadarChart;
