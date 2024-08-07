import axois from "@/axios";

export default {
    toAbsolute(url){
        if(!url){
            return url;
        }

        // 如果不是绝对地址需要转为绝对地址
        if(url.startsWith("http")){
            return url
        }

        // 防止重复调用
        if (!( url.startsWith("api") || url.startsWith("/api") ) ){
            url = "api" + url
        }
        url = this.combineUrls(window.targetUrl,url)
        return url;
    },

    combineUrls(base, relative) {
        if (base.endsWith('/')) {
            base = base.slice(0, -1);
        }
        if (!relative.startsWith('/')) {
            relative = '/' + relative;
        }
        return base + relative;
    },

    url(url, openWindow=false){

        if(url === ""){
            return;
        }

        let target = url
        if(!url.startsWith("h")){// 如果不是绝对地址需要转为绝对地址
            target = this.toAbsolute(url)
        }

        if(openWindow){
            window.open(target);
            return;
        }

        let iframe = document.createElement('iframe')

        // 防止影响页面，并设置属性
        iframe.style.display = 'none'
        iframe.style.height = 0
        // iframe.referrerPolicy= 'no-referrer'




        // 加入dom树
        document.body.appendChild(iframe)

        setTimeout(function () {
            iframe.src = target
        }, 100);

        setTimeout(function () {
            document.body.removeChild(iframe)
        }, 500);
    },

    getText(url){

        let u = url

        // 构造提交数据
        // let d = {
        //     vFileId:aim,
        // }

        return axois[0]({
            method:"get",
            url:u,
            responseType: 'text',
            withCredentials: false
        })
    },

    getTextOther(url){

        let u = url

        return axois[2]({
            method:"get",
            url:u,
            responseType: 'text',
            withCredentials: false
        })
    },

    getOther(url){

        let u = url

        return axois[2]({
            method:"get",
            url:u,
        })
    }
}