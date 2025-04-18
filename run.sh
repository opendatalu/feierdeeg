#!/usr/bin/env bash
cd "$(dirname "$0")"
alert() {
    if command -v alert.sh 1>/dev/null; then
        alert.sh "$@"
    fi
}

node_cmd="node"
if [[ "$OSTYPE" == "cygwin" ]]; then
        node_cmd="node.exe"
elif [[ "$OSTYPE" == "msys" ]]; then
        node_cmd="node.exe"
elif [[ "$OSTYPE" == "win32" ]]; then
        node_cmd="node.exe"
fi

$node_cmd main.js >> ./log.txt 2>&1 || alert "Error feierdeeg main.js" log.txt
$node_cmd ical.js >> ./log.txt 2>&1 || alert "Error feierdeeg ical.js" log.txt
$node_cmd upload.js >> ./log.txt 2>&1 || alert "Error feierdeeg upload.js" log.txt