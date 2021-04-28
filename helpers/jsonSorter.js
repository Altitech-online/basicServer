
export default function sortJsonObject(object){
    return Object.keys(object).sort().reduce(
        (obj, key) => { 
        obj[key] = object[key]; 
        return obj;
        }, 
        {}
    );
}