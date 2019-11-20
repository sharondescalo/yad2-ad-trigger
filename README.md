# yad2-ad-trigger
Yad2 ad trigger
## Getting Startedt

### Prerequisites
npm install puppeteer
npm install pm2 -g

## Running the tests
run once: 

```
node app.js
```

Pm2 will now restart the app.js every 245 min.

```
pm2 start app.js --cron "*/245 * * * *"
```

