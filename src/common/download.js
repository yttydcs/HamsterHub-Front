import axois from "@/axios";

export default {
    toAbsolute(url){

        if(!url){
            return url;
        }

        if(url.startsWith("http")){// 如果不是绝对地址需要转为绝对地址
            return url
        }

        return window.targetUrl + "api" + url
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