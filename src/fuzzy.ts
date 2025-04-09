import Algo from "./algo";
import { LevenshteinDistance } from "./levenshtein_distance";

export  type SupportedAlgorithms = "ld" | "s"; 
export type MatchScore = number;
export type Fuzzer = InstanceType< typeof Algo> ;

export type FuzzerConfig = {
    convertToPercentage?:boolean
}

export class Fuzzy 
{
    fuzzer:Fuzzer;
    config:FuzzerConfig;

    constructor(algo:SupportedAlgorithms, config?:FuzzerConfig)
    {
        
        if(algo == 'ld') {
            this.fuzzer = new LevenshteinDistance(); 
        } else {
            throw Error("No Algo found")
        }  
        this.config = {convertToPercentage: false, ... config};
              
    }

    match(s1:string, s2:string):MatchScore 
    {
        let matchScore = this.fuzzer.match(s1.toLowerCase(), s2.toLowerCase());
        if(this.config.convertToPercentage == true) {
            let context = this.fuzzer.getContext();
            let score = this.fuzzer.standardizeScore(matchScore, context);
            this.fuzzer.cleanContext();
            return score;  
        }
        return matchScore;
    }
}

