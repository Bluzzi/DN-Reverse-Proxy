# Domain Name Reverse Proxy

A reverse proxy that allows you to configure domain name redirections from a port (e.g. port 80) to another port. This allows you to host multiple sites on a single IP/Machine. 

```
npm install
node .
```

## Configuration
The configuration files are located in the ``resources`` folder of the project.

### Port
If you want to change the default port, change the ``port`` key in the configuration.

### Redirections
```json
{
    "redirections": {
        "symp.fr": 3000,
        "enely.art": 3001
    }
}
```

### SSL (for HTTPS)
If you do not want to use an SSL key, remove the ``ssl`` key from the default configuration.
```json
{
    "ssl": {
        "key": "key.pem",
        "cert": "cert.pem"
    }
} 
```

### Error page
If you want to change the style of the HTML error page, you can simply edit the ``error.html`` page, it contains a ``{error}`` tag that you can use to get the error message. 