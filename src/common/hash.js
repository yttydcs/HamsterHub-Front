import md5 from "crypto-js/md5"
import CryptoJS from "crypto-js"


const chunkSize = 1024 * 1024;



export default {
    fileToHash(file) {
        return new Promise((resolve, reject) => {
            // 创建FileReader对象
            const reader = new FileReader();

            // 读取文件
            reader.readAsArrayBuffer(file);

            // 文件读取完成
            reader.onload = function() {
                // 获取文件内容
                const content = this.result;

                // 计算md5
                const hash = CryptoJS.algo.MD5.create();
                let offset = 0;
                while (offset < content.byteLength) {
                    const slice = content.slice(offset, offset + chunkSize);
                    const wordArray = CryptoJS.lib.WordArray.create(slice);
                    hash.update(wordArray);
                    offset += chunkSize;
                }
                const md5 = hash.finalize().toString()
                // 返回md5
                resolve(md5);
            };

            // 文件读取失败
            reader.onerror = function() {
                reject(reader.error);
            };
        });
    }
}