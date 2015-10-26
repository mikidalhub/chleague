var serverChunk = "http://www.smartbet.info/api/";
//var serverChunk = "http://premium.smartsoft.ro:8090/SmartBet/";
//var serverChunk = "http://192.168.230.198:8080/WorldCup/";
exports.getConstant = function (key) {
    var constants = {
        "server": serverChunk,
        "login": serverChunk + "setLogin?userName=", //+ xxx&password=123456
        "validate": serverChunk + "validateSession?sessionId=",
        "matches": serverChunk + "getMatches?sessionId=",
        "countries": serverChunk + "getCountries?sessionId=",
        "usermatches": serverChunk + "getMatchesForUser?sessionId=", // + &userId=
        "currenttime": serverChunk + "WorldCup/getCurrentTime=?sessionId=",
        "users": serverChunk + "getUsers?sessionId=",
        "changepassword": serverChunk + "changePassword?sessionId=", //+ &password=xxx&newPassword=xxx
        "image": serverChunk + "img/", //+image.png
        "setusertip": serverChunk + "setTip?sessionId=", //+&matchID=xxx&tip1=x&tip2=x  
        "servertime": serverChunk + "getCurrentTime?sessionId=", 
        
    }
    return constants[key];
}

