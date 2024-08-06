import rss from "@/api/rss"

export async function addList(root,parent,url,name,downloadId,replaceHost) {
    return await rss.addList(root,parent,url,name,downloadId,replaceHost);
}

export async function delList(id) {
    return await rss.deleteList(id);
}

export async function query() {
    let res
    try {
        res = await rss.queryList();
    } catch(err){
        return res.data = [];
    }
    return res
}

export async function setListEnable(id,enable) {
    return await rss.setListEnable(id,enable);
}

export async function updateList(id,root,parent,url,name,downloadId,replaceHost) {
    if (!id){
        return null;
    }
    return await rss.updateList(id,root,parent,url,name,downloadId,replaceHost);
}

export default {query,delList,addList,setListEnable,updateList};
