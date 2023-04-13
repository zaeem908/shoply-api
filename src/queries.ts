export const getUserByEmail = `SELECT email,password FROM users3 WHERE email = $1`
export const createSubject = `INSERT INTO subjects2 (subject) VALUES ($1)`