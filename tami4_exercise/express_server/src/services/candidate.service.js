const db = require('../db/database');

exports.ListCandidates = () => {
    return new Promise((res, rej) => {
        const sqlQuery = "SELECT * FROM candidate ORDER BY first_name";
        db.all(sqlQuery, [], (err, candidates) => {
            if (err) return rej (err);
            return res(candidates);
        });
    });
};

exports.GetCandidate = (id) => {
    return new Promise((res, rej) => {
        const sqlQuery = `SELECT * FROM candidate WHERE id = '${id}'`;
        db.get(sqlQuery, [], (err, candidates) => {
            if (err) return rej (err);
            return res(candidates);
        });
    });
};