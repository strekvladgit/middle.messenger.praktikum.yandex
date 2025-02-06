import { DataType } from "../../src/utils/HTTPTransport";
interface FormValues {
    [key: string]: string | File | null;
}

export const submitForm = (e:Event, callback: (data: DataType) => void) => {
    e.preventDefault();
    const {target} = e;
    if (target instanceof HTMLFormElement) {
        const formData = new FormData(target);
        const jsonData: FormValues = {};
        formData.forEach((value: FormDataEntryValue, key:string)=>{
            if(value){
                jsonData[key]=value;
            } else {
                throw new Error('Поля не заполнены')
            }
            
        })
        callback(jsonData as DataType)
        
    }
}
