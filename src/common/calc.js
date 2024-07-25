
export default {
    toSizeString(size){
        let res = 0;
        let unit ="Byte"
        let units = ["Byte","KB","MB","GB","TB","PB","EB","ZB","BB"];

        if(!size){
            return "0B";
        }


        res = Number(size);

        for (let i = 0; i < units.length; i++) {
            if(res < 1024){
                unit = units[i];
                break;
            }
            res = res / 1024
        }

        return res.toFixed(2)+" "+unit
    },
    // 函数：将毫秒级 Unix 时间戳转换为 yyyy-MM-dd'T'HH:mm:ss 格式的日期字符串
    formatTimestampWithUserTimeZone(unixTimestampMs) {
    const date = new Date(unixTimestampMs);

    // 获取用户的本地时区
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: userTimeZone,
        hour12: false // 24小时制
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);

    // 获取日期和时间部分
    const parts = formatter.formatToParts(date);

    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;
    const second = parts.find(part => part.type === 'second').value;

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
}