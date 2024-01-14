function getBlob(url, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (xhr.status === 200) {
            cb(xhr.response);
        }
    };
    xhr.send();
}

function saveAs(blob, filename) {
    if (navigator.msSaveOrOpenBlob) {
        // 对于Internet Explorer
        navigator.msSaveBlob(blob, filename);
    } else {
        // 对于现代浏览器
        let link = document.createElement("a");

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // 设置链接样式
        link.style.display = "none";

        // 将链接追加到body
        document.body.appendChild(link);

        // 模拟点击链接
        link.click();

        // 从body中删除链接
        document.body.removeChild(link);

        // 撤销对象URL以释放资源
        window.URL.revokeObjectURL(link.href);
    }
}

export function download(url, filename) {
    getBlob(url, function(blob) {
        saveAs(blob, filename);
    });
}