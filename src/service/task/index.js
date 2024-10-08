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
            progressStatus:"info",
            downloader: res[i].downloader,
        }

        if(res[i].name){
            item.name = res[i].name;
        }

        if(res[i].state === "1"){
            data.doing.push(item);
        }else{
            if(res[i].state === "3"){
                item.progressStatus = "success"
                item.progress = 100;
            } else if(res[i].state === "2"){
                item.progressStatus = "error";
                item.progress = 0;
            }

            data.done.push(item);
        }
    }

    return data;
}

export async function addTask(root, parentId, url, name, downloader) {
    await downloadTask.create(root, parentId, url, name, downloader);
}

export async function delTask(tag, downloader) {
    await downloadTask.delete(tag, downloader);
}

function getProgress(completed,total){
    if(!completed||!total){
        return 0;
    }

    return (completed*100 / total).toFixed(2);
}


export async function queryDownloader(){
    return (await downloadTask.queryDownloader()).data;
}
export default { getTasks,addTask,delTask,queryDownloader };