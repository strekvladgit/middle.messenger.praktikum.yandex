import { ClassType, Props } from "../framework/Block";

export function createList(chatsProps: Props, className : ClassType){
    if(Array.isArray(chatsProps)){
        return chatsProps.map((props: Props)=>{
            return new className(props)
        })
    }
    return [];
}
