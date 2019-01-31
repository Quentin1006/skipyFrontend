export const _readImageFile = (fileToUpload) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {

        reader.onloadstart = () => {
        }

        reader.onloadend = () => { 
        }
    
        reader.onload = (e) => {
            const preview = e.target.result;
            const uploadedImg = {
                fileToUpload,
                preview, 
            }
            resolve(uploadedImg)
        }

        reader.onerror = reject;

        reader.onprogress = (e) => {
            console.log(e.loaded / e.total * 100);
        }
    
        reader.readAsDataURL(fileToUpload);
    })
};



export const base64toBlob = (base64Data, contentType ='') => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}


