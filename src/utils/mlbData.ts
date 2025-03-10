import type { HittingProspect, PitchingProspect } from "../types/baseball";

const YANKEES_PROSPECTS: (HittingProspect | PitchingProspect)[] = [
	{
		name: "Jasson Dominguez",
		position: "OF",
		level: "MLB",
		age: 22,
		avg: 0.258,
		hr: 4,
		rbi: 7,
		obp: 0.303,
		slg: 0.568,
		rank: 1,
	},
	{
		name: "George Lombard Jr.",
		position: "SS/2B",
		level: "A+",
		age: 19,
		avg: 0.324,
		hr: 8,
		rbi: 42,
		obp: 0.401,
		slg: 0.482,
		rank: 2,
	},
	{
		name: "Spencer Jones",
		position: "OF",
		level: "AA",
		age: 23,
		avg: 0.267,
		hr: 16,
		rbi: 65,
		obp: 0.352,
		slg: 0.481,
		rank: 3,
	},
	{
		name: "Ben Hess",
		position: "RHP",
		level: "ROK",
		age: 22,
		era: 2.85,
		ip: 42.1,
		so: 58,
		whip: 1.12,
		wins: 3,
		rank: 4,
	},
	{
		name: "Will Warren",
		position: "RHP",
		level: "MLB",
		age: 25,
		era: 3.31,
		ip: 125.2,
		so: 149,
		whip: 1.21,
		wins: 11,
		rank: 5,
	},
	{
		name: "Chase Hampton",
		position: "RHP",
		level: "AA",
		age: 22,
		era: 3.45,
		ip: 98.2,
		so: 112,
		whip: 1.15,
		wins: 8,
		rank: 6,
	},
	{
		name: "Everson Pereira",
		position: "OF",
		level: "MLB",
		age: 22,
		avg: 0.312,
		hr: 18,
		rbi: 53,
		obp: 0.389,
		slg: 0.551,
		rank: 7,
	},
	{
		name: "Drew Thorpe",
		position: "RHP",
		level: "AA",
		age: 23,
		era: 2.52,
		ip: 89.2,
		so: 102,
		whip: 1.08,
		wins: 7,
		rank: 8,
	},
	{
		name: "Jorbit Vivas",
		position: "2B",
		level: "AA",
		age: 22,
		avg: 0.28,
		hr: 12,
		rbi: 58,
		obp: 0.358,
		slg: 0.435,
		rank: 9,
	},
	{
		name: "Roderick Arias",
		position: "SS",
		level: "A",
		age: 19,
		avg: 0.267,
		hr: 8,
		rbi: 35,
		obp: 0.345,
		slg: 0.432,
		rank: 10,
	},
];

// Keep the cache mechanism for future real data fetching
let cachedProspects: (HittingProspect | PitchingProspect)[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getCachedYankeesProspects(): Promise<
	(HittingProspect | PitchingProspect)[]
> {
	const now = Date.now();
	if (cachedProspects && now - lastFetchTime < CACHE_DURATION) {
		return cachedProspects;
	}

	// Sort and return the static data
	cachedProspects = [...YANKEES_PROSPECTS].sort((a, b) => {
		if (a.rank && b.rank) return a.rank - b.rank;
		if (a.rank) return -1;
		if (b.rank) return 1;
		return a.age - b.age;
	});

	lastFetchTime = now;
	return cachedProspects;
}
