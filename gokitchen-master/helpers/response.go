package helpers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Response is a helper for returning an arbitrary JSON-formatted response
// without declaring an explicit struct
type Response map[string]interface{}

// JSONResponse returns a JSON-formatted response of a Response object, with the appropriate
// content-type header and status code set.
func JSONResponse(rw http.ResponseWriter, response Response, code int) {
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(code)
	m, err := json.Marshal(interface{}(response))
	if err != nil {
		log.Println("Error marshalling JSON Response") // todo: return the error
	}
	fmt.Fprint(rw, string(m))
}

// ErrorResponse returns a formatted error response in the way described by the API docs
// It takes rw, a ResponseWriter object, and err, an error object to report back to the user.
func ErrorResponse(rw http.ResponseWriter, err error, httpCode int) {
	s := struct {
		Message string `json:"msg"`
		Code    int    `json:"code,omitempty"`
	}{
		Message: err.Error(),
		Code:    code,
	}
	JSONResponse(rw, Response{"err": s, "opstat": "error"}, httpCode)
}
