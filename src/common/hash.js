import SparkMD5 from 'spark-md5';

const chunkSize = 1024 * 1024 * 2;

export default {
    fileToHash(file, setProgress=null) {
        return new Promise((resolve, reject) => {
            let blobSlice =
                    File.prototype.slice ||
                    File.prototype.mozSlice ||
                    File.prototype.webkitSlice,
                // 总分片数
                chunks = Math.ceil(file.size / chunkSize),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                fileReader = new FileReader()

            fileReader.onload = function (e) {
                if(setProgress){ // 防止null
                    setProgress(currentChunk,chunks)
                }

                spark.append(e.target.result) // Append array buffer
                currentChunk++

                if (currentChunk < chunks) {
                    loadNext()
                } else {
                    resolve(spark.end())
                }
            }

            fileReader.onerror = function (error) {
                reject(error)
            }

            function loadNext() {
                // 切片起始位置
                let start = currentChunk * chunkSize
                // 切片终止位置
                let end = start + chunkSize
                if (end > file.size) {
                    end = file.size
                }

                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
            }

            loadNext()
        })
    }

}