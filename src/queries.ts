export const getUserByEmail = `SELECT email,password FROM shoplyusers WHERE email = $1`
export const checkProductName = `SELECT productname FROM shoplyitems WHERE productname = $1`
export const createItem = `INSERT INTO shoplyitems (productname,productdescription,productprice,productcategory,productimage) VALUES ($1,$2,$3,$4,$5)`
export const createUser = 'INSERT INTO shoplyusers (name,email,password) VALUES ($1,$2,$3)'