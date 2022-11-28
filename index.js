const api = require("./api")

const http = require('http'), fs = require('fs')

http.createServer(async(req, res) => {
    if(req.url === '/exchangerate' && req.method === 'GET') {
        const response = await api.get()
        const nome = response.data[0].code + "-" + response.data[0].codein
        const highValue = response.data[0].high
        const lowValue = response.data[0].low
        const bid = response.data[0].bid
        const averageCurrentDay = (parseFloat(response.data[0].high) + parseFloat(response.data[0].low))/2
        const averageYesterday = (parseFloat(response.data[1].high) + parseFloat(response.data[1].low))/2
        const averageTwoDays = (averageCurrentDay + averageYesterday)/2
        return res.end(JSON.stringify({nome, highValue, lowValue, bid, averageCurrentDay, averageTwoDays}))
    }
}).listen(8000)