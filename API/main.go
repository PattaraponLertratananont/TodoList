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
	Message    string `json:"message"`
	Duedate string `json:"duedate"`
}
type ListDb struct {
	Lists []TodoList
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
	e.GET("/read", Getdata)
	e.POST("/write", PostData)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
//Method
func Getdata(c echo.Context) error {
	// Open our jsonFile
	jsonFile, err := os.Open("message.json")
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

	return c.JSON(http.StatusOK, result["Lists"])
}

func PostData(c echo.Context) error {
	todoLists := []TodoList{}
	db := ListDb{Lists: todoLists}

	defer c.Request().Body.Close()

	err := json.NewDecoder(c.Request().Body).Decode(&db)
	if err != nil {
		log.Printf("Failed processing PostData request %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	//method writeJsonfile
	buf := new(bytes.Buffer)
	encoder := json.NewEncoder(buf)
	encoder.Encode(db)

	file, err := os.Create("message.json")
	if err != nil {
		log.Fatalln(err)
	}
	defer file.Close()
	io.Copy(file, buf)

	log.Printf("this's your list: %#v", db)
	return c.String(http.StatusOK, "We got your list.")
}
