import Algo from "./algo";
import { DamerauLevenshtein } from "./damerau-levenshtein";
import { JaroWinkler } from "./jaro–winkler";
import { Levenshtein } from "./levenshtein";

export  type SupportedAlgorithms = "ld" | "dl" | "jw"; 
export type MatchScore = number;
export type Fuzzer = InstanceType< typeof Algo> ;

export type DL_Modes = 'OSA' | 'DAT';

export type mode = DL_Modes

export type FuzzerConfig = {
    convertToPercentage?:boolean,
    mode?: mode
}

export class Fuzzy 
{
    fuzzer:Fuzzer;
    config:FuzzerConfig;

    constructor(algo:SupportedAlgorithms, config?:FuzzerConfig)
    {
        
        if(algo == 'ld') {
            this.fuzzer = new Levenshtein(); 
        } else if(algo == 'dl') {
            this.fuzzer = new DamerauLevenshtein(); 
        } else if(algo == 'jw') {
            this.fuzzer = new JaroWinkler(); 
        } else {
            throw Error("No Algo found")
        }  
        this.config = { convertToPercentage: false, ... config};
              
    }

    match(s1:string, s2:string):MatchScore 
    {
        let matchScore = this.fuzzer.match(s1.toLowerCase(), s2.toLowerCase(), this.config);       
        if(this.config.convertToPercentage == true) {
            let context = this.fuzzer.getContext();
            let score = this.fuzzer.standardizeScore(matchScore, context);
            this.fuzzer.cleanContext();
            return score;  
        }
        return matchScore;
    }
}

