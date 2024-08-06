import rss from "@/api/rss"


export async function delList(id) {
    return await rss.deleteTask(id);
}

export async function query(id) {
    let res
    try {
        res = await rss.queryTasks(id);
    } catch(err){
        return res.data = [];
    }
    return res
}


export default {query,delList};
