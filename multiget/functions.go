package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/ovhlabs/functions/go-sdk/event"
)

type Request struct {
	Url   string
	Count int
}

func MultiGet(event event.Event) (string, error) {
	if event.Data == "" {
		return "", errors.New("No data to process")
	}

	var request Request
	err := json.Unmarshal([]byte(event.Data), &request)
	if err != nil {
		return "", err
	}

	if request.Count == 0 {
		request.Count = 2
	}

	done := make(chan bool)
	successes := 0
	errors := 0

	for i := 0; i < request.Count; i++ {
		go func() {
			resp, err := http.Get(request.Url)
			if err != nil {
				fmt.Println(err)
				errors++
			} else if resp.StatusCode != 200 {
				errors++
				fmt.Println(resp.StatusCode)
			} else {
				successes++
			}
			done <- true
		}()
	}

	for i := 0; i < request.Count; i++ {
		<-done
	}

	return fmt.Sprintf("%d successes and %d errors", successes, errors), nil
}
