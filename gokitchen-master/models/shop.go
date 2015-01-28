package models

import (
	"labix.org/v2/mgo/bson"
)

type Shop struct {
	Id           bson.ObjectId `bson:"_id,omitempty"`
	DisplayName  string        `form:"display_name"`
	Location     string        `form:"location"`
	country_code string        `form:"country_code"`
	OwnerId      int           `form:"owner_id"`
}
