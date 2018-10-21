let isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0 ? true : false;
}

module.exports = {isRealString};