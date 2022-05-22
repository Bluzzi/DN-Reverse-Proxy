# Domain Name Proxy

A proxy allowing to redirect HTTP requests on port 80 to another port depending on the domain name used. This allows you to host multiple sites on a single machine. Without compromising on the speed of execution. 

## Config file

Configuration of redirects :
```json
{
    "records": {
        "symp.fr": 3000,
        "enely.art": 3001
    }
}
```

Configuration of SSL (to enable HTTPS) :
```json
{
    "port": 80,
    "https": true,
    "ssl": {
        "key": "key.pem",
        "cert": "cert.pem"
    },
} 
```

