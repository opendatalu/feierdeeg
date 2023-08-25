alert() {
    if command -v alert.sh 1>/dev/null; then
        alert.sh "$@"
    fi 
}
node.exe main.js >> ./log.txt 2>&1 || alert "Error feierdeeg main.js" log.txt
node.exe ical.js >> ./log.txt 2>&1 || alert "Error feierdeeg ical.js" log.txt
node.exe upload.js >> ./log.txt 2>&1 || alert "Error feierdeeg upload.js" log.txt