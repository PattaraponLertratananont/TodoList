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

//* Default fuction API
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
	fileHandle, _ := os.Open("message.txt")
	defer fileHandle.Close()

	//! Scanของข้างใน
	fileScanner := bufio.NewScanner(fileHandle)
	var data []string
	//! จับของยัดใส่slice data string
	for fileScanner.Scan() {
		txt := fileScanner.Text()
		data = append(data, txt)
		fmt.Println("data : " + txt)

	}
	//! Unfurl to pure string from slice []string
	bytedata := strings.Join(data, ",")
	fmt.Println("data 2: " + bytedata)

	//! Put result to TodoList struct
	result := []TodoList{}
	//! "[" and "]" are making data to correct json.format
	json.Unmarshal([]byte("["+bytedata+"]"), &result)

	return c.JSON(http.StatusOK, result)
}
