import { MatchScore } from "./fuzzy";

export default abstract class Algo 
{
    context:any = {}
    abstract match(s1:string, s2:string, config?:any):MatchScore; 
    abstract standardizeScore(score:number, meta:any):MatchScore;
    getContext():any
    {
        return this.context;
    }
    setContext(key:string, val:any):void 
    {
        this.context[key] = val;
    }

    cleanContext() 
    {
        this.context = {};
    }

    addPadding(str:string):string 
    {
        return "#"+str;
    }
}