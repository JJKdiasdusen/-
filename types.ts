
export interface SurveyData {
  // 1-5
  classLevel: string;
  gender: string;
  definition: string;
  reasons: string[];
  knowsHarm: string;
  // 6-10
  seenUsers: string;
  actionIfOffered: string;
  schoolInfoSufficient: string;
  preventionIdea: string;
  everSmoked: string;
  // 11-15
  offeredCigarettes: string;
  offeredDrugs: string;
  offerEnvironment: string;
  futureImpact: string;
  helpAvoid: string;
}

export enum SurveyStep {
  START = 'START',
  FORM = 'FORM',
  SUBMITTING = 'SUBMITTING',
  RESULT = 'RESULT'
}
