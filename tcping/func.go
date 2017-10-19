package main

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/ovhlabs/functions/go-sdk/event"
	tcp "github.com/tevino/tcp-shaker"
)

func TcpPing(event event.Event) (string, error) {
	addr := event.Data
	addr = strings.TrimSuffix(addr, "\n")
	if addr == "" {
		return "", errors.New("addr undefined")
	}

	fmt.Printf("addr=%s", addr)

	c := tcp.NewChecker(true)
	if err := c.InitChecker(); err != nil {
		return "", err
	}

	start := time.Now()
	if err := c.InitChecker(); err != nil {
		return "", err
	}
	if err := c.CheckAddr(addr, time.Second*3); err != nil {
		return "", err
	}

	ms := float64(time.Since(start)/time.Nanosecond) / 1000000
	return fmt.Sprintf("%f", ms), nil
}
