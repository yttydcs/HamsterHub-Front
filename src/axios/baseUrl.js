export default function url(){
    if(window.targetUrl){
        return window.targetUrl
    }
    let url = window.hamsterHubConfig.url || process.env["VUE_APP_URL"];
    if(!url.endsWith("/")){
        url = url+ "/"
    }
    window.targetUrl = url

    return url
}