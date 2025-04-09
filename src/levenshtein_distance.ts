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
        let _offset = 1;

        let d = new Array(m+_offset).fill(null).map(() => {
            return new Array(n +_offset).fill(0);
        });

        for(let i = 0; i <= m; i++ ){
            d[i][0] = i;
        }

        for(let j = 0; j <= n; j++ ){
            d[0][j] = j;
        }


        for(let k = 1; k < n+_offset; k++) {
            for(let l = 1; l < m+_offset; l++) {
                let substitutionCost = 1;
                if(s1[l-1] == s2[k-1]) {
                    substitutionCost = 0
                }
                let va1 = d[l-1][k] + 1;
                let va2 = d[l][k-1] + 1;
                let va3 = d[l-1][k-1] + substitutionCost;
                d[l][k] = this.minimum([
                    va1,
                    va2,
                    va3
                ])               
             
            }
        }
        return d[m+_offset-1][n+_offset-1];

    }
    standardizeScore(score: number, context: any): MatchScore 
    {
      let max = context.max;
      let s = (max-score)/max * 100;
      return s;
    }
    
}