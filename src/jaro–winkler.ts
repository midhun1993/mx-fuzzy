import Algo from "./algo";
import { MatchScore } from "./fuzzy";

export class JaroWinkler extends Algo 
{
    
    
    match(s1: string, s2: string, config?: any): MatchScore
    {

        //https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
       let m = s1.length;
       let n = s2.length;
       let limit = Math.floor(Math.max(m,n)/2) - 1;
       let mc = 0;
       let tpChars:any = {};
       let tp = 0;
       let lar, sml;
       let l = 0;
       let p = 0.25;
       let pMode = true;

       if(m > n) {
             lar = s1;
             sml = s2;
       } else {
             lar = s2;
             sml = s1;
       }

     
      
       for(let i =0; i < lar.length; i++ ) {
            let ul = i + Math.floor(limit/2)+1;
            let ll = i - Math.floor(limit/2);
            let sub = sml.slice(ll, ul);
           
                
            if(lar[i] == sml[i]) {
                mc++;
                if(pMode) 
                {
                    l++;
                }
            } else if(sub.indexOf(lar[i]) != -1) {
                mc++;
                pMode = false;
            } else {
                pMode = false;
            }

            if(lar[i] != sml[i]){
                if( lar[i+1] == sml[i] && lar[i] != sml[i-1]) {
                    tpChars[lar[i]] = 1;
                } 
                if(lar[i] == sml[i+1] && sml[i] != lar[i-1]) {
                    tpChars[sml[i]] = 1;
                }
            }
        }
       
       if(mc==0) {
         return 0;
       }

       tp = Object.keys(tpChars).length / 2;
       p = p > 4 ? 4 : p;
       let simj = 1/3*(mc/m + mc/n + (mc - tp)/mc)
       let simw = simj + l* p * ( 1- simj); 
       return simw;
    }


    standardizeScore(score: number, meta: any): MatchScore 
    {
        let fix = parseFloat(score.toFixed(2))
        return  fix * 100;
    }
    
}