import { Fuzzy, MatchScore, SupportedAlgorithms  } from "./fuzzy";

export default function fuzzer(algo:SupportedAlgorithms) 
{
   return  {
        match : function(s1:string, s2:string):MatchScore 
        {
            let fuzz = new Fuzzy(algo);
            return fuzz.match(s1, s2);
        }
   }
}