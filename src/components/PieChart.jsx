import React, { useRef, useEffect, useState } from 'react';

const PieChart = ({ data, width, height }) => {
    const canvasRef = useRef(null);
    const legendRef = useRef(null);
    const [hoveredSlice, setHoveredSlice] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        const totalValue = data.reduce((acc, item) => acc + item.value, 0);
        let startAngle = 0;

        // Draw each slice
        data.forEach((item, index) => {
            const sliceAngle = (item.value / totalValue) * 2 * Math.PI;

            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.arc(
                width / 2,
                height / 2,
                Math.min(width, height) / 2,
                startAngle,
                startAngle + sliceAngle
            );
            ctx.closePath();
            ctx.fillStyle = index === hoveredSlice ? item.color : item.color || 'gray';
            ctx.fill();

            // Draw the slice's value label inside the slice
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = width / 2 + Math.cos(labelAngle) * (Math.min(width, height) / 3);
            const labelY = height / 2 + Math.sin(labelAngle) * (Math.min(width, height) / 3);

            ctx.fillStyle = 'black';
            ctx.font = '17px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${item.value}`, labelX, labelY);

            startAngle += sliceAngle;
        });

        // Draw labels at the bottom outside the chart with color indicators
        const legendContainer = legendRef.current;
        legendContainer.innerHTML = ''; // Clear previous content

        const legendSquareSize = 12; // Size of the color indicator square
        const legendTextOffset = 5; // Offset between color indicator and text

        const legendWidth = width; // Set legend container width to match chart width

        data.forEach((item, index) => {
            const legendItem = document.createElement('div');
            legendItem.style.display = 'inline-block';
            legendItem.style.marginRight = '20px'; // Adjust spacing between legend items

            // Color indicator
            const colorIndicator = document.createElement('div');
            colorIndicator.style.width = `${legendSquareSize}px`;
            colorIndicator.style.height = `${legendSquareSize}px`;
            colorIndicator.style.backgroundColor = item.color || 'gray';
            colorIndicator.style.display = 'inline-block';
            colorIndicator.style.marginRight = `${legendTextOffset}px`;
            legendItem.appendChild(colorIndicator);

            // Label text
            const labelText = document.createElement('span');
            labelText.textContent = item.label;
            legendItem.appendChild(labelText);

            legendContainer.appendChild(legendItem);
        });
    }, [data, width, height, hoveredSlice]);

    const handleSliceHover = (index) => {
        setHoveredSlice(index);
    };

    const handleSliceLeave = () => {
        setHoveredSlice(null);
    };

    return (
        <div style={{ position: 'relative', width: `${width}px` }}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onMouseEnter={() => handleSliceHover()}
                onMouseLeave={() => handleSliceLeave()}
            />
            <div
                ref={legendRef}
                style={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '0',
                    width: `${width}px`,
                    textAlign: 'center'
                }}
            />
        </div>
    );
};

export default PieChart;
