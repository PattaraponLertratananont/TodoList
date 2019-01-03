package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type TodoList struct {
	Message string `json:"message"`
	Duedate string `json:"duedate"`
}
type ListDb struct {
	Lists []TodoList
}
type List struct {
	Duedate string
	Message string
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
	e.POST("/write", PostTest)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

//Method
func PostTest(c echo.Context) error {
	//write
	message := `{"Message": "Helsdsdlo","Duedate": "01/01/19"}` + "\n"
	// If the file doesn't exist, create it, or append to the file
	f, err := os.OpenFile("message.txt", os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := f.Write([]byte(message)); err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
	return c.String(http.StatusOK, "We got your list.")
}

func Getdata(c echo.Context) error {
	fileHandle, _ := os.Open("message.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)
	var data []string
	for fileScanner.Scan() {
		txt := fileScanner.Text()
		data = append(data, txt)
		fmt.Println("data : " + txt)

	}

	bdata := strings.Join(data, ",")
	//datasJson, _ := json.Marshal(data)
	fmt.Println("data 2: " + bdata)

	result := []TodoList{}
	json.Unmarshal([]byte("["+bdata+"]"), &result)

	return c.JSON(http.StatusOK, result)
}
