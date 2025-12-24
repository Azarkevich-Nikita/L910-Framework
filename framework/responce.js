module.exports = function enhanceResponce (res) {
    res.status = function(code) {
        res.statusCode = code;
        return res;
    };

    res.send = function(data) {
        if(typeof data === "object") {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
        }
        else{
            res.end(String(data));
        }
    };

    res.json = function(data) {
        res.setHeader("Content-Type", "apllication/json");
        res.end(JSON.stringify(data));
    };

    return res;
}