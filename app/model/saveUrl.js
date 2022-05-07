function saveUrl(connection, shortUrl, longUrl, callback) {
    connection.query(
        `INSERT INTO URL VALUES(?, ?)`, [shortUrl, longUrl], (err, result) => {
            callback(err, result);
        }
    );
};
module.exports = saveUrl;