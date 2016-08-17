script_name=$0

function log() {
    function logline() {
        colorprint $1 "[$script_name] $2: $3"
    }

    case $1 in
        INFO)
            logline "1;37" "$1" "$2" ;;
        WARN)
            logline 33 "$1" "$2" >&2 ;;
        ERROR)
            logline 31 "$1" "$2" >&2 ;;
        DEBUG)
            logline 0 "$1" "$2" ;;
        SUCCESS)
            logline "32" "$1" "$2" ;;
        *)
            log "ERROR" "unknown log level"
            return 1
            ;;
    esac
}

function colorprint() {
    # $1 = color number, for example 31, 33, 1;37
    # $2 = message to be echoed
    echo -e "\033[$1m$2\033[0m" 
}
