package main

import (
  "github.com/labstack/echo"
  "github.com/labstack/echo/middleware"

  "./handler"
)

func main() {

  // Create Echo instance
  e := echo.New()

  // add middleware
  e.Use(middleware.Logger())
  e.Use(middleware.Recover())
  e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"*"},
        AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
    }))

  // routes
  e.OPTIONS("/*", handler.OptionsOK())
  e.GET("/", handler.MainPage())
  e.GET("/:username", handler.UserPage())
  e.GET("/users/", handler.SelectUsers())
  e.GET("/users/:id", handler.SelectUser())
  e.GET("/events", handler.GetEvents())
  e.GET("/actions", handler.GetActions())
  e.GET("/action/:id", handler.PostAction())
  e.GET("/relations", handler.GetRelations())
  e.PUT("relations/:id", handler.UpdateEventRelation())

  // start server
  e.Start(":9000")
}
