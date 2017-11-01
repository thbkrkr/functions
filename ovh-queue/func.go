package main

import (
	"encoding/json"
	"os"
	"sync"

	log "github.com/Sirupsen/logrus"
	"github.com/ovh/go-ovh/ovh"
	"github.com/ovhlabs/functions/go-sdk/event"
)

var client *ovh.Client

func init() {
	client, _ = ovh.NewClient(
		"ovh-eu",
		os.Getenv("OVH_AK"),
		os.Getenv("OVH_AS"),
		os.Getenv("OVH_CK"),
	)
}

func ListApps(event event.Event) (string, error) {
	apps, err := find("/dbaas/queue", "")
	if err != nil {
		return "", err
	}

	json, err := json.Marshal(apps)
	if err != nil {
		return "", err
	}

	return string(json), nil
}

func ListTopics(event event.Event) (string, error) {
	apps, err := find("/dbaas/queue", "/topic")
	if err != nil {
		return "", err
	}

	json, err := json.Marshal(apps)
	if err != nil {
		return "", err
	}

	return string(json), nil
}

func find(url string, prefix string) ([]interface{}, error) {
	var ids []string
	err := client.Get(url, &ids)
	if err != nil {
		return nil, err
	}

	results := make([]interface{}, len(ids))
	wg := sync.WaitGroup{}

	for i, id := range ids {
		wg.Add(1)

		go func(index int, sid string) {
			defer wg.Done()

			var result interface{}
			err = client.Get(url+"/"+sid+prefix, &result)
			if err != nil {
				log.WithError(err).Error("Fail to get ", url+sid)
				return
			}
			results[index] = result

		}(i, id)
	}

	wg.Wait()

	return results, nil
}
