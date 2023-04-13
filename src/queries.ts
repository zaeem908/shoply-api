export const getUserByEmail = `SELECT email,password FROM users3 WHERE email = $1`
export const createSubject = `INSERT INTO subjects2 (subject) VALUES ($1)`
export const findEmail = `SELECT email,password from users3 WHERE email = $1`