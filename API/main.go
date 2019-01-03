package main

import (
	"bufio"
	"encoding/json"
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

//! Default fuction API
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/", hello)
	e.GET("/read", Getdata)
	e.POST("/write", Postdata)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

//! 2 Methods
func Postdata(c echo.Context) error {
	//! Write file
	var message TodoList
	err := c.Bind(&message)
	strmsg, err := json.Marshal(message)

	//! If the file doesn't exist, create it, or append to the file
	file, err := os.OpenFile("message.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, os.ModeAppend)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := file.Write([]byte(strmsg)); err != nil {
		log.Fatal(err)
	}
	if _, err := file.Write([]byte("\n")); err != nil {
		log.Fatal(err)
	}
	if err := file.Close(); err != nil {
		log.Fatal(err)
	}
	return c.String(http.StatusOK, "We got your list.")
}

func Getdata(c echo.Context) error {
	//! Openfile message.txt ที่เก็บข้อมูลต่างๆ ไว้
	fileHandle, err := os.Open("message.txt")
	if err != nil {
		log.Fatalf("Failed open file message.txt: %s", err)
	}
	defer fileHandle.Close()

	//! Scanของข้างใน
	fileScanner := bufio.NewScanner(fileHandle)

	//! จับของยัดใส่slice data string
	var dataslice []string
	for fileScanner.Scan() {
		txt := fileScanner.Text()
		dataslice = append(dataslice, txt)
	}
	//! Unfurl to pure string from slice []string
	bytedata := strings.Join(dataslice, ",")

	//! Put result to TodoList struct
	result := []TodoList{}
	//! "[" and "]" are making data to correct json.format
	json.Unmarshal([]byte("["+bytedata+"]"), &result)

	//! Return this if it's work!!
	return c.JSON(http.StatusOK, result)
}
