package main

import (
	"encoding/json"
	"os"
	"sync"
	"time"

	"github.com/Sirupsen/logrus"
	"github.com/ovh/go-ovh/ovh"
	"github.com/thcdrt/funk-go/event"
)

func ListOvhQueueApp(event event.Event) (string, error) {
	client, _ := ovh.NewClient(
		"ovh-eu",
		os.Getenv("OVH_AK"),
		os.Getenv("OVH_AS"),
		os.Getenv("OVH_CK"),
	)

	var ids []string
	err := client.Get("/dbaas/queue", &ids)
	if err != nil {
		return "", err
	}

	results := make([]interface{}, len(ids))
	wg := sync.WaitGroup{}

	for i, id := range ids {
		wg.Add(1)

		go func(index int, sid string) {
			defer wg.Done()

			start := time.Now()
			var result interface{}
			err = client.Get("/dbaas/queue/"+sid, &result)
			if err != nil {
				return
			}
			results[index] = result

			logrus.Infof("Get /dbaas/queue/"+sid+" in %s", time.Since(start))

		}(i, id)
	}

	wg.Wait()

	json, err := json.Marshal(results)
	if err != nil {
		return "", err
	}

	return string(json), nil
}
