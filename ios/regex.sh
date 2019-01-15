#!/bin/bash

REGEX_TEST=\'/[^\']--\\\\n.*\\*1\\\\n/g\'

cat ./session.txt | grep -P -q $REGEX_TEST
