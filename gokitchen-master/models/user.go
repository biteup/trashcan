package models

import (
	"labix.org/v2/mgo/bson"
)

type User struct {
	Id       bson.ObjectId `bson:"id"`
	UserId   int           `bson:"user_id"`
	Password string        `bson:password`
	Email    string        `bson:"email"`
}
