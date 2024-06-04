import downloadTask from '@/api/downloadTask';
import calc from "@/common/calc";

export async function getTasks() {
    let res =(await downloadTask.query()).data;

    let data = {done:[],doing:[]}
    let len = res.length;
    for (let i = 0; i < len; i++) {

        let item = {
            index:res[i].tag,
            status:res[i].state,
            name:res[i].tag,
            progress:getProgress(res[i].completed , res[i].total),
            type:"file",
            total: calc.toSizeString(res[i].total),
        }

        if(res[i].name){
            item.name = res[i].name;
        }

        if(res[i].state === "done"){
            data.done.push(item);
        }else{
            data.doing.push(item);
        }
    }

    return data;
}

export async function addTask(root, parentId, url) {
    await downloadTask.create(root, parentId, url);
}

export async function delTask(tag) {
    await downloadTask.delete(tag);
}

function getProgress(completed,total){
    if(!completed||!total){
        return 0;
    }

    return (completed*100 / total).toFixed(2);
}

export default { getTasks,addTask };