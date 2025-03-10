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
		avg: 0.301,
		hr: 12,
		rbi: 58,
		obp: 0.385,
		slg: 0.492,
		rank: 2,
	},
	{
		name: "Spencer Jones",
		position: "OF",
		level: "AAA",
		age: 23,
		avg: 0.283,
		hr: 23,
		rbi: 82,
		obp: 0.365,
		slg: 0.512,
		rank: 3,
	},
	{
		name: "Ben Hess",
		position: "RHP",
		level: "AA",
		age: 22,
		era: 3.15,
		ip: 112.1,
		so: 138,
		whip: 1.18,
		wins: 9,
		rank: 4,
	},
	{
		name: "Will Warren",
		position: "RHP",
		level: "MLB",
		age: 25,
		era: 3.42,
		ip: 152.1,
		so: 164,
		whip: 1.23,
		wins: 11,
		rank: 5,
	},
	{
		name: "Chase Hampton",
		position: "RHP",
		level: "MLB",
		age: 23,
		era: 3.38,
		ip: 144.2,
		so: 168,
		whip: 1.12,
		wins: 12,
		rank: 6,
	},
	{
		name: "Everson Pereira",
		position: "OF",
		level: "MLB",
		age: 23,
		avg: 0.245,
		hr: 14,
		rbi: 48,
		obp: 0.318,
		slg: 0.421,
		rank: 7,
	},
	{
		name: "Drew Thorpe",
		position: "RHP",
		level: "AAA",
		age: 24,
		era: 2.68,
		ip: 158.1,
		so: 196,
		whip: 1.05,
		wins: 15,
		rank: 8,
	},
	{
		name: "Jorbit Vivas",
		position: "2B",
		level: "MLB",
		age: 23,
		avg: 0.282,
		hr: 15,
		rbi: 71,
		obp: 0.368,
		slg: 0.445,
		rank: 9,
	},
	{
		name: "Roderick Arias",
		position: "SS",
		level: "AA",
		age: 20,
		avg: 0.285,
		hr: 12,
		rbi: 52,
		obp: 0.392,
		slg: 0.458,
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
