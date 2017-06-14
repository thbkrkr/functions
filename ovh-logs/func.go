package main

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/Sirupsen/logrus"
	"github.com/thbkrkr/logrusOVH"
	"github.com/thcdrt/funk-go/event"
)

func SendLog(event event.Event) (string, error) {
	logger, err := newLogger()
	if err != nil {
		return "", err
	}

	data, err := json.Marshal(event.Data)
	if err != nil {
		return "", err
	}

	logger.Print(string(data))
	return "Log sent!", nil
}

func newLogger() (*logrus.Logger, error) {
	endpoint := os.Getenv("OVH_LOGS_ENDPOINT")
	token := os.Getenv("OVH_LOGS_TOKEN")
	hook, err := logrusOVH.NewOvhHook(endpoint, token, logrusOVH.GELFTLS)
	if err != nil {
		return nil, err
	}

	hook.SetCompression(logrusOVH.COMPRESSGZIP)
	logger := logrus.New()
	logger.Out = ioutil.Discard
	logger.Hooks.Add(hook)

	return logger, nil
}
