export const loadState=(key,defaultValues)=>{
    try {
        const new_state=sessionStorage.getItem(key);
        if(new_state === null)
            return defaultValues
        return JSON.parse(new_state)
    } catch (error) {
        return defaultValues;
    }
}

export const saveState=(key,obj)=>{
    try {
        sessionStorage.setItem(key,JSON.stringify(obj))
    } catch (error) {
        return error
    }
}