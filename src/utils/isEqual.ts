export default function isEqual(a: object, b: object){

    const arrA = a ? Object.entries(a) : null;
    const arrB = b ? Object.entries(b) : null;
    
    if(!arrA||!arrB){
        return false;
    }

    if(arrA.length !== arrB.length){
        return false;
    }

    for(let i = 0; i<arrA.length; i++){
        
        if(typeof arrA[i][1] === 'object'){
            if(isEqual(arrA[i][1], arrB[i][1])){
                continue;
            }
        }

        if(arrA[i][0]!==arrB[i][0]||arrA[i][1]!==arrB[i][1]){
            return false;
        }
    }

    return true;
}
