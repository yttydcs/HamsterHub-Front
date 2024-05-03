import config from "@/api/config";

async function set(key,value){
    await config.set(key,value);
}

async function query(){
    return await config.query();
}

export default {
    set,
    query
}