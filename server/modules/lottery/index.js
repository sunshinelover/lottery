// [{name: "10元话费", weight: 1}, {name: "50积分", weight: 50}, ...]
module.exports = async (app, options) => {
  app.get('/lottery', async (req, res) => {
    let n = Math.random()
    // let n = 0.1
    let json = {
      data: [
        { name: '谢谢参与', weight: 27 },
        { name: '50积分', weight: 5 },
        { name: '10元话费', weight: 3 }, //
        { name: '谢谢参与', weight: 27 },
        { name: '50积分', weight: 5 },
        { name: '100元话费', weight: 1 }, //
        { name: '谢谢参与', weight: 27 },
        { name: '50积分', weight: 5 },
        { name: '100元话费', weight: 1 }, //
        { name: '1元现金', weight: 2 } //
      ],
      result: 0
    }
    if (n < 0.02) {
      //2% 100元话费
      json.result = 1
    } else if (n < 0.04) {
      //2% 1元现金
      json.result = 2
    } else if (n < 0.07) {
      //3% 10话费
      json.result = 3
    } else if (n < 0.22) {
      //15% 50积分
      json.result = 4
    } else {
      //谢谢参与
      json.result = 0
    }
    return json
  })
}

function rnd(n, m) {
  return Math.floor(Math.random() * (m - n) + n)
}
