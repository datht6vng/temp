function findLongUrl(connection, url, callback) {
    connection.query(
        `SELECT * FROM URL WHERE LONG_URL = ?`, [url], (err, result) => {
            callback(err, result);
        }
    );
}
function findShortUrl(connection, url, callback) {
    connection.query(
        `SELECT * FROM URL WHERE SHORT_URL = ?`, [url], (err, result) => {
            callback(err, result);
        }
    );
}
module.exports = {findLongUrl, findShortUrl};