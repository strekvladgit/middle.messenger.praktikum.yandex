import { Indexed } from "../framework/Block";

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
  
        try {
            if (typeof rhs[p] === 'object'&& rhs[p]!== null && !Array.isArray(rhs[p])) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else if(Array.isArray(rhs[p])) {
                lhs[p] = [...rhs[p]];
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }
  
    return lhs;
}
