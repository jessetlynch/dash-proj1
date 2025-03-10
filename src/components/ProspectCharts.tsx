import { useEffect } from "react";
import Chart from "chart.js/auto";
import type { HittingProspect, PitchingProspect } from "../types/baseball";

interface Props {
	prospects: (HittingProspect | PitchingProspect)[];
}

export default function ProspectCharts({ prospects }: Props) {
	useEffect(() => {
		// Level Distribution Chart
		const levelCtx = document.getElementById(
			"levelDistribution"
		) as HTMLCanvasElement;
		const levels = ["AAA", "AA", "A+", "A"];
		const levelCounts = levels.map(
			(level) => prospects.filter((p) => p.level === level).length
		);

		new Chart(levelCtx, {
			type: "pie",
			data: {
				labels: levels,
				datasets: [
					{
						data: levelCounts,
						backgroundColor: ["#1e40af", "#3b82f6", "#93c5fd", "#bfdbfe"],
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: "Prospect Distribution by Level",
					},
				},
			},
		});

		// Age Distribution Chart
		const ageCtx = document.getElementById(
			"ageDistribution"
		) as HTMLCanvasElement;
		const pitchers = prospects.filter((p) => "era" in p) as PitchingProspect[];
		const hitters = prospects.filter((p) => "avg" in p) as HittingProspect[];

		new Chart(ageCtx, {
			type: "bar",
			data: {
				labels: ["20-21", "22-23", "24+"],
				datasets: [
					{
						label: "Pitchers",
						data: [
							pitchers.filter((p) => p.age <= 21).length,
							pitchers.filter((p) => p.age > 21 && p.age <= 23).length,
							pitchers.filter((p) => p.age > 23).length,
						],
						backgroundColor: "#1e40af",
					},
					{
						label: "Hitters",
						data: [
							hitters.filter((p) => p.age <= 21).length,
							hitters.filter((p) => p.age > 21 && p.age <= 23).length,
							hitters.filter((p) => p.age > 23).length,
						],
						backgroundColor: "#3b82f6",
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: "Age Distribution by Position Type",
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							stepSize: 1,
						},
					},
				},
			},
		});

		// Pitching Performance Chart
		const pitchingCtx = document.getElementById(
			"pitchingStats"
		) as HTMLCanvasElement;
		const sortedPitchers = [...pitchers]
			.sort((a, b) => a.era - b.era)
			.slice(0, 5);

		new Chart(pitchingCtx, {
			type: "radar",
			data: {
				labels: ["ERA", "WHIP", "K/IP", "Wins"],
				datasets: sortedPitchers.map((pitcher) => ({
					label: pitcher.name,
					data: [
						pitcher.era,
						pitcher.whip,
						(pitcher.so / pitcher.ip).toFixed(2),
						pitcher.wins,
					],
					fill: true,
					backgroundColor: `rgba(59, 130, 246, ${0.2})`,
					borderColor: "#3b82f6",
					pointBackgroundColor: "#3b82f6",
				})),
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: "Top Pitchers Performance Comparison",
					},
				},
				scales: {
					r: {
						min: 0,
						pointLabels: {
							font: {
								size: 12,
							},
						},
					},
				},
			},
		});

		// Hitting Performance Chart
		const hittingCtx = document.getElementById(
			"hittingStats"
		) as HTMLCanvasElement;
		const sortedHitters = [...hitters]
			.sort((a, b) => b.avg - a.avg)
			.slice(0, 5);

		new Chart(hittingCtx, {
			type: "bar",
			data: {
				labels: sortedHitters.map((h) => h.name),
				datasets: [
					{
						label: "AVG",
						data: sortedHitters.map((h) => h.avg),
						backgroundColor: "#1e40af",
					},
					{
						label: "OBP",
						data: sortedHitters.map((h) => h.obp),
						backgroundColor: "#3b82f6",
					},
					{
						label: "SLG",
						data: sortedHitters.map((h) => h.slg),
						backgroundColor: "#93c5fd",
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: "Top Hitters Slash Lines",
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						max: 1,
					},
				},
			},
		});
	}, [prospects]);

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<canvas id="levelDistribution"></canvas>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<canvas id="ageDistribution"></canvas>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<canvas id="pitchingStats"></canvas>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<canvas id="hittingStats"></canvas>
				</div>
			</div>
		</div>
	);
}
