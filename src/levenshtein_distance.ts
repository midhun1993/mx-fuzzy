import Algo from "./algo";
import { MatchScore } from "./fuzzy";

export class LevenshteinDistance extends Algo {
  
    minimum(arr: number[]):number
    {
        return Math.min(...arr);
    }

    match(s1: string, s2: string): MatchScore 
    {
        let m = s1.length;
        let n = s2.length;

        this.setContext('max', Math.max(m,n));



        // To handle array idx;
        let _offset = 2;

        let d = new Array(m+_offset).fill(null).map(() => {
            return new Array(n +_offset).fill(0);
        });

        for(let i = 0; i < m; i++ ){
            d[i+_offset][0] = s1[i];
        }

        for(let j = 0; j < n; j++ ){
            d[0][j+_offset] = s2[j];
        }
        

        for(let k = 0; k < n; k++) {
            for(let l =0; l < m; l++) {
                let substitutionCost = 1;
                if(s1[l] == s2[k]) {
                    substitutionCost = 0
                }
                let va1 = d[l+_offset-1][k+_offset] + 1;
                let va2 = d[l+_offset][k+_offset-1] + 1;
                let va3 = d[l+_offset-1][k+_offset-1] + substitutionCost;
                d[l+_offset][k+_offset] = this.minimum([
                    va1,
                    va2,
                    va3
                ])               
             
            }
        }

        return d[m-1][n-1];

    }
    standardizeScore(score: number, context: any): MatchScore 
    {
      let max = context.max;
      let s = (max-score)/max * 100;
      return s;
    }
    
}