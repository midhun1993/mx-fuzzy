import Algo from "./algo";
import { LevenshteinDistance } from "./levenshtein_distance";

export  type SupportedAlgorithms = "ld" | "s"; 
export type MatchScore = number;
export type Fuzzer = InstanceType< typeof Algo> ;

export class Fuzzy 
{
    fuzzer:Fuzzer;
    constructor(algo:SupportedAlgorithms)
    {
        
        if(algo == 'ld') {
            this.fuzzer = new LevenshteinDistance(); 
        } else {
            throw Error("No Algo found")
        }  
              
    }

    match(s1:string, s2:string):MatchScore 
    {
        let matchScore = this.fuzzer.match(s1, s2);
        let context = this.fuzzer.getContext();
        let score = this.fuzzer.standardizeScore(matchScore, context);
        this.fuzzer.cleanContext();
        return score;
    }
}

