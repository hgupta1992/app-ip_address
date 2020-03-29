const IPCIDR = require('ip-cidr');

function getFirstIpAddress(cidrStr, callback){
    let firstIpAddress = null;
    let callbackError = null;

    const cidr = new IPCIDR(cidrStr);
    const options = {
        from:1,
        limit:1
    };

    if(!cidr.isValid()){
        callbackError = 'Error: Invalid CIDR passed to getFirstIpAddress.';
    } else {
        [firstIpAddress] = cidr.toArray(options);
    }
    return callback(firstIpAddress, callbackError);
}

function main() {
    let sampleCidrs = ['127.16.10.0/24','172.16.10.0 255.255.255.0','172.16.10.128/25','192.168.1.216/30'];
    let sampleCidrsLen = sampleCidrs.length;

    for(var i=0; i<sampleCidrsLen; i++){
        console.log(`\n ---Test Numbers ${i+1} getFirstIpAddress(${sampleCidrs[i]}) ---`);
        getFirstIpAddress(sampleCidrs[i], (data, error)=> {
            if(error){
                console.log(`Error returned from GET request: ${error}`);
            } else {
                console.log(`Response returned from GET request: ${data}`);
            }
        });
    }
}
main();