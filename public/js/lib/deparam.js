function deparamURL(query) {
    query = decodeURIComponent(query).replace(/\+/g, " ");
    let vars = query.substring(1);
    vars = vars.split("&");
    let varsObj = {};
    vars.forEach(function(el){
        let pair = el.split("=");
        let key = decodeURIComponent(pair[0].trim());
        let value = decodeURIComponent(pair[1].trim());
        varsObj[key] = value;
    });
    return varsObj;
}