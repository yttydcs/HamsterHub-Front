
export default {
    toAbsolute(url){

        if(!url){
            return url;
        }

        return process.env["VUE_APP_URL"]+"api" + url
    },

    url(url){

        if(url === ""){
            return;
        }

        let target = this.toAbsolute(url)
        let iframe = document.createElement('iframe')

        // 防止影响页面，并设置属性
        iframe.style.display = 'none'
        iframe.style.height = 0
        iframe.src = target

        // 加入dom树
        document.body.appendChild(iframe)
        setTimeout(function () {
            document.body.removeChild(iframe)
        }, 300);
    },
}