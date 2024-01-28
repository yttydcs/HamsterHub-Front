
export default {
    toSizeString(size){
        console.log(size)
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
}