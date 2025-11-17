import React, { useMemo } from 'react';
import type { Score } from '../types';

interface WeeklyProgressChartProps {
    scores: Score[];
}

export default function WeeklyProgressChart({ scores }: WeeklyProgressChartProps) {
    const chartData = useMemo(() => {
        if (!scores.length) return [];

        // Group scores by day
        const scoresByDay = new Map<string, number[]>();
        
        scores.forEach(score => {
            const date = new Date(score.created_at);
            const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
            
            if (!scoresByDay.has(dayKey)) {
                scoresByDay.set(dayKey, []);
            }
            scoresByDay.get(dayKey)!.push(score.score);
        });

        // Get last 7 days and calculate best score for each day
        const last7Days: { date: string; score: number; label: string }[] = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dayKey = date.toISOString().split('T')[0];
            
            const dayScores = scoresByDay.get(dayKey) || [];
            const bestScore = dayScores.length > 0 ? Math.max(...dayScores) : 0;
            
            // Format label (e.g., "Mon", "Tue")
            const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            last7Days.push({
                date: dayKey,
                score: bestScore,
                label: dayLabel
            });
        }

        return last7Days;
    }, [scores]);

    const maxScore = useMemo(() => {
        const max = Math.max(...chartData.map(d => d.score), 10);
        return Math.ceil(max / 10) * 10; // Round up to nearest 10
    }, [chartData]);

    if (!chartData.length) {
        return null;
    }

    // Chart dimensions
    const width = 350;
    const height = 150;
    const padding = { top: 15, right: 20, bottom: 20, left: 25 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate points for the line
    const points = chartData.map((d, i) => {
        const x = padding.left + (i / (chartData.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - (d.score / maxScore) * chartHeight;
        return { x, y, ...d };
    });

    // Create path for the line
    const linePath = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');

    // Create path for the gradient fill area
    const areaPath = `
        M ${points[0].x} ${padding.top + chartHeight}
        L ${points[0].x} ${points[0].y}
        ${points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}
        L ${points[points.length - 1].x} ${padding.top + chartHeight}
        Z
    `;

    // Y-axis labels
    const yLabels = [0, maxScore / 2, maxScore];

    return (
        <div className="w-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-2xl border border-indigo-400/30 backdrop-blur-sm mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                    📈 Weekly Progress
                </h3>
                <div className="text-xs text-indigo-300">Last 7 Days</div>
            </div>

            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-64"
            >
                {/* Grid lines */}
                {yLabels.map((label, i) => {
                    const y = padding.top + chartHeight - (label / maxScore) * chartHeight;
                    return (
                        <g key={`grid-${i}`}>
                            <line
                                x1={padding.left}
                                y1={y}
                                x2={padding.left + chartWidth}
                                y2={y}
                                stroke="rgba(139, 92, 246, 0.2)"
                                strokeWidth="1"
                                strokeDasharray="3,3"
                            />
                            <text
                                x={5}
                                y={y}
                                fontSize="10"
                                fill="rgba(199, 210, 254, 0.6)"
                                textAnchor="start"
                                dominantBaseline="middle"
                            >
                                {label}
                            </text>
                        </g>
                    );
                })}

                {/* Gradient definition for area fill */}
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                        <stop offset="50%" stopColor="rgb(236, 72, 153)" />
                        <stop offset="100%" stopColor="rgb(168, 85, 247)" />
                    </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                    d={areaPath}
                    fill="url(#areaGradient)"
                />

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data points */}
                {points.map((point, i) => (
                    <g key={`point-${i}`}>
                        {/* Outer glow */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="6"
                            fill="rgba(236, 72, 153, 0.3)"
                            className="animate-pulse"
                        />
                        {/* Point */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="white"
                            stroke="rgb(168, 85, 247)"
                            strokeWidth="1.5"
                        />
                        {/* Score label on hover */}
                        {point.score > 0 && (
                            <g className="opacity-0 hover:opacity-100 transition-opacity">
                                <rect
                                    x={point.x - 15}
                                    y={point.y - 25}
                                    width="30"
                                    height="18"
                                    fill="rgba(88, 28, 135, 0.95)"
                                    rx="3"
                                    stroke="rgba(168, 85, 247, 0.8)"
                                    strokeWidth="1"
                                />
                                <text
                                    x={point.x}
                                    y={point.y - 16}
                                    fontSize="11"
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontWeight="bold"
                                >
                                    {point.score}
                                </text>
                            </g>
                        )}
                    </g>
                ))}

                {/* X-axis labels */}
                {points.map((point, i) => (
                    <text
                        key={`label-${i}`}
                        x={point.x}
                        y={padding.top + chartHeight + 15}
                        fontSize="11"
                        fill="rgba(199, 210, 254, 0.8)"
                        textAnchor="middle"
                        fontWeight="500"
                    >
                        {point.label}
                    </text>
                ))}
            </svg>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-indigo-300">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span>Best Score</span>
                </div>
            </div>
        </div>
    );
}
