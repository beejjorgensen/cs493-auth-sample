/*
 * User schema and data accessor methods.
 */

const { ObjectId } = require('mongodb');

const { extractValidFields } = require('../lib/validation');
const { getDBReference } = require('../lib/mongo');

/*
 * Schema for a User.
 */
const UserSchema = {
  name: { required: true },
  email: { required: true }
};
exports.UserSchema = UserSchema;


/*
 * Insert a new User into the DB.
 */
exports.insertNewUser = async function (user) {
  const userToInsert = extractValidFields(user, UserSchema);
  const db = getDBReference();
  const collection = db.collection('users');
  const result = await collection.insertOne(userToInsert);
  return result.insertedId;
};


/*
 * Fetch a user from the DB based on user ID.
 */
exports.getUserById = async function (id) {
  const db = getDBReference();
  const collection = db.collection('users');
  const results = await collection.find({ _id: new ObjectId(id) }).toArray();
  return results[0];
}


/*
 * Fetch a user from the DB based on user email.  Assumes email is unique among
 * stored users.
 */
exports.getUserByEmail = async function (email) {
  const db = getDBReference();
  const collection = db.collection('users');
  const results = await collection.find({ email: email }).toArray();
  return results[0];
}
