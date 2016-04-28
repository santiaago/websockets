package main

import (
	"fmt"
	"log"
	"net/http"
)

func init() {
	log.SetFlags(log.Ltime | log.Ldate | log.Lshortfile)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello world")
}

func main() {
	log.Println("Starting server")

	http.HandleFunc("/", helloHandler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServer", err)
	}

}
