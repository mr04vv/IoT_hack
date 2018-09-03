package handler

import (
  "net/http"
  "github.com/labstack/echo"
  _ "github.com/go-sql-driver/mysql"
  "github.com/gocraft/dbr"
  "fmt"
   // "bytes"
)

type (
  userinfo struct {
    ID          int     `db:"id"`
    Email       string  `db:"email"`
    First_name  string  `db:"first_name"`
    Last_name   string  `db:"last_name"`
  }

  userinfoJSON struct {
    ID   int     `json:"id"`
    Email string  `json:"email"`
    Firstname string  `json:"firstName"`
    Lastname string  `json:"lastName"`
  }

  responseData struct {
    Users        []userinfo      `json:"users"`
  }

  event struct {
    ID    int         `db:"id"`
    Name  string      `db:"name"`
  }

  eventsResponse struct {
    Events        []event     `json:"events"`
  }

  action struct {
    ID    int         `db:"id"`
    Name  string      `db:"name"`
  }

  actionsResponse struct {
    Actions        []action     `json:"actions"`
  }

  actionEventRelation struct {
    ID            int       `db:"id"`
    Action_id     int       `db:"action_id"`
    Action_name   string    `db:"action_name"`
    Event_id      int       `db:"event_id"`
    Event_name    string    `db:"event_name"`
  }

  relationResponse struct {
    Relations       []actionEventRelation   `json:"relations"`
  }


)

var (
  tablename = "accounts"
  seq = 1
  conn, _ = dbr.Open("mysql", "root:root@tcp(127.0.0.1:3306)/iot", nil)
  sess = conn.NewSession(nil)
)

func OptionsOK() echo.HandlerFunc {
  return func(c echo.Context) error {
    return c.NoContent(http.StatusOK)
  }
}

func MainPage() echo.HandlerFunc {
  return func(c echo.Context) error {
    json := map[string]string{
      "hello": "world",
      "hogehoge": "fugafuga",
    }

    return c.JSON(http.StatusOK, json)
  }
}

func UserPage() echo.HandlerFunc {
  return func(c echo.Context) error {
    username := c.Param("username")
    json := map[string]string {
      "username": username,
    }

    return c.JSON(http.StatusOK, json)
  }
}

func SelectUsers() echo.HandlerFunc {
  return func(c echo.Context) error {
    var u []userinfo

    sess.Select("*").From(tablename).Load(&u)
    response := new(responseData)
    response.Users = u

    return c.JSON(http.StatusOK, response)
  }
}

func SelectUser() echo.HandlerFunc {
  return func(c echo.Context) error {
    var m userinfo
    id := c.Param("id")
    sess.Select("*").From(tablename).Where("id = ?", id).Load(&m)

    return c.JSON(http.StatusOK, m)
  }
}

func GetEvents() echo.HandlerFunc {
  return func(c echo.Context) error {
    var events []event

    sess.Select("*").From("events").Load(&events)
    response := new(eventsResponse)
    response.Events = events

    return c.JSON(http.StatusOK, response)
  }
}

func GetActions() echo.HandlerFunc {
  return func(c echo.Context) error {
    var actions []action

    sess.Select("*").From("actions").Load(&actions)
    response := new(actionsResponse)
    response.Actions = actions

    return c.JSON(http.StatusOK, response)
  }
}

func PostAction() echo.HandlerFunc {
  return func (c echo.Context) error {
   var relation actionEventRelation
   sess.Select("action_event_relations.*, e.name as event_name").From("action_event_relations left join events e on action_event_relations.event_id = e.id").Where("action_id = ?", c.Param("id")).Load(&relation)
   print(relation.Event_name)
   resp, err := http.Get("https://maker.ifttt.com/trigger/" +  relation.Event_name + "/with/key/ctgPnNWeW-rxhpy1EsAr0c")
   if err != nil {
     return err
   }
   defer resp.Body.Close()
  //  hostname := "https://c87c72d7.ngrok.io/google-home-notifier"
  //  if relation.Event_name == "twitter" {
  //    jsonStr := `{"text":"ついーとしました"}`
  //
  // req, err := http.NewRequest(
  //     "POST",
  //     url,
  //     bytes.NewBuffer([]byte(jsonStr)),
  // )
  //  } else if a relation.Event_name == "slack" {
  //
  //  }

   return c.JSON(http.StatusOK, relation)

  }
}

func GetRelations() echo.HandlerFunc {
  return func (c echo.Context) error {
    var relations []actionEventRelation
    sess.Select("e.id as event_id, e.name as event_name, a.id as action_id, a.name as action_name").From("action_event_relations left join events e on action_event_relations.event_id = e.id left join actions a on action_event_relations.action_id = a.id order by a.id").Load(&relations)

    response := new(relationResponse)
    response.Relations = relations

    return c.JSON(http.StatusOK, response)
  }
}

func UpdateEventRelation() echo.HandlerFunc {
  return func(c echo.Context) error {
    relation := new(actionEventRelation)
    if err := c.Bind(relation); err != nil {
        return err
    }

    fmt.Println(relation)

    attrsMap := map[string]interface{}{"event_id": relation.Event_id}
    sess.Update("action_event_relations").SetMap(attrsMap).Where("action_id = ?", c.Param("id")).Exec()
    return c.NoContent(http.StatusOK)
  }
}
