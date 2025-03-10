export interface BaseProspect {
	name: string;
	position: string;
	level: string;
	age: number;
	rank?: number;
}

export interface HittingProspect extends BaseProspect {
	avg: number;
	hr: number;
	rbi: number;
	obp: number;
	slg: number;
}

export interface PitchingProspect extends BaseProspect {
	era: number;
	ip: number;
	so: number;
	whip: number;
	wins: number;
}

export type Prospect = HittingProspect | PitchingProspect;

export interface ProspectStats {
	totalTop100: number;
	averageAge: number;
	averageLevel: string;
	topPitchers: PitchingProspect[];
	topHitters: HittingProspect[];
}
