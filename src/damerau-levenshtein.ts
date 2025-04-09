import Algo from "./algo";
import { MatchScore } from "./fuzzy";

export class DamerauLevenshtein extends Algo 
{

    minimum(arr: number[]):number
    {
        return Math.min(...arr);
    }

    optimalStringAlignmentDistance(s1: string, s2: string):MatchScore
    {
        
        let a = this.addPadding(s1);
        let b = this.addPadding(s2);

        let m = a.length;
        let n = b.length;

        this.setContext('max', Math.max(m,n));

        let d = new Array(m).fill(null).map(() => {
            return new Array(n).fill(0);
        });


        
        for(let i = 0; i < m; i++ ){
            d[i][0] = i;
        }

        for(let j = 0; j < n; j++ ){
            d[0][j] = j;
        }


        for(let k = 1; k < m; k++) {
            for(let l = 1; l < n; l++) {
                let substitutionCost = 1;
                if(b[l] == a[k]) {
                    substitutionCost = 0
                }
                let va1 = d[k-1][l] + 1;
                let va2 = d[k][l-1] + 1;
                let va3 = d[k-1][l-1] + substitutionCost;
                d[k][l] = this.minimum([
                    va1,
                    va2,
                    va3
                ])  
                if(k > 1
                   && l > 1
                   && a[k] == b[l-1]
                   && a[k-1] == b[l]
                 ) {
                    d[k][l] = this.minimum([
                        d[k][l],
                        d[k-2][l-2]+1
                    ]); 
                 }           
             
            }
        }
        return d[m-1][n-1];
    }

    match(s1: string, s2: string, config:any): MatchScore 
    {
        if(config.mode === 'DST') {

        }
        return this.optimalStringAlignmentDistance(s1, s2);
    }
    
    standardizeScore(score: number, meta: any): MatchScore 
    {
        return 1;
    }
    
}