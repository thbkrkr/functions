package main

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/Sirupsen/logrus"
	"github.com/thbkrkr/logrusOVH"
	"github.com/thcdrt/funk-go/event"
)

var ovhLogs *logrus.Logger

func SendLog(event event.Event) (string, error) {
	l, err := getLogger()
	if err != nil {
		return "", err
	}

	data, err := json.Marshal(event.Data)
	if err != nil {
		return "", err
	}

	l.Print(string(data))
	return "Log sent!", nil
}

func getLogger() (*logrus.Logger, error) {
	if ovhLogs == nil {
		var err error
		ovhLogs, err = newLogger()
		if err != nil {
			return nil, err
		}
	}
	return ovhLogs, nil
}

func newLogger() (*logrus.Logger, error) {
	logrus.Info("new logger")

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
