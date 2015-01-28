package main

import (
	"fmt"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/binding"
	"github.com/martini-contrib/render"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
	"log"
	"net/http"
)

type Shop struct {
	Id           bson.ObjectId `bson:"_id,omitempty"`
	Display_Name string        `form:"display_name"`
	Location     string        `form:"location"`
	Country_Code string        `form:"country_code"`
	Owner_Id     int           `form:"owner_id"`
}

func SetUpServer() *martini.ClassicMartini {
	m := martini.Classic()
	m.Use(render.Renderer())
	m.Use(MongoDB())

	m.Get("/", helloworld)

	m.Post("/shop", binding.Bind(Shop{}), func(shop Shop, r render.Render, db *mgo.Database) {
		db.C("shop").Insert(shop)
		r.JSON(200, map[string]interface{}{"hello": "world"})

	})

	m.Get("/hello/:name", func(params martini.Params) string {
		return fmt.Sprintf("Hello %s", params["name"])
	})

	return m

}

func MongoDB() martini.Handler {
	session, err := mgo.Dial("mongodb://admin:veryBenri123@ds053390.mongolab.com:53390/benri")
	if err != nil {
		panic(err)
	}

	return func(c martini.Context) {
		s := session.Clone()
		c.Map(s.DB("benri"))
		defer s.Close()
		c.Next()
	}
}

func main() {
	m := SetUpServer()
	port := 3000
	log.Printf("Server running on port %d!\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), m))
}

func helloworld() string {
	return "Hello World"
}
