import { FuzzerConfig, Fuzzy, MatchScore, SupportedAlgorithms  } from "./fuzzy";

export default function fuzzer(algo:SupportedAlgorithms, config?:FuzzerConfig) 
{
   return  {
        match : function(s1:string, s2:string):MatchScore 
        {
            let fuzz = new Fuzzy(algo, config);
            return fuzz.match(s1, s2);
        }
   }
}