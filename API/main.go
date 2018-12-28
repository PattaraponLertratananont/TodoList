package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type TodoList struct {
	Name    string `json:"name"`
	Duedate string `json:"duedate"`
}
type ListDb struct {
	Lists []TodoList
	Type  string
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

// Echo instance
func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/", hello)
	e.GET("/test", Getdata)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

//█████████████████████████████████████████████████████████████████
//Method
func Getdata(c echo.Context) error {
	// Open our jsonFile
	jsonFile, err := os.Open("messege.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	return c.JSON(http.StatusOK, result["MSG"])
}

func PostData(c echo.Context) error {
	todoLists := []TodoList{}
	db := ListDb{Lists: todoLists, Type: "Simple"}

	buf := new(bytes.Buffer)
	encoder := json.NewEncoder(buf)
	encoder.Encode(db)

	file, err := os.Create("todolist.json")
	if err != nil {
		log.Fatalln(err)
	}
	defer file.Close()
	io.Copy(file, buf)
}
