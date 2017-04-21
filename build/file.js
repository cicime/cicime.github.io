var fs = require('fs');
var path = require('path');
var data = require('../src/data')

// module.exports = fs.writeFileSync('./static/diary.json', JSON.stringify(data));


const sendData = (data, filename) => {
  var info = {}
  info.id = filename.replace(/(^.*\\)|(\.md)/g,'')
  info.url = 'path/' + info.id + '.md'
  info.data = data

  if(/---[\r\n](.*[\r\n])+---/.test(data)) {
    let ctx = data.match(/---[\r\n](.*[\r\n])+---/)[0].match(/.*\r\n/g)
    ctx.forEach((txt) => {
      if (/(\w+):\s([^\r\n]+)/.test(txt)) {
        info[RegExp.$1] = RegExp.$2
      }
    })
  }
  return info
}

const readfile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, {
      encoding: 'utf-8'
    }, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(sendData(data, filename))
    })
  })
}

const file = (src) => {
  return new Promise((res, rej) => {
    fs.readdir(src, (err, fils) => {
      let entry = [];
      fils.forEach((fileName) => {
        if (/.*\.md$/.test(fileName)) {
          entry.push(src +'\\'+ fileName)
        }
      });
      res(entry)
    })
  })
}

async function init() {
  let list = await file(path.resolve(__dirname, '../static/path'))
  let data = { content: [] }
  for(let file of list) {
    data.content.push(await readfile(file))
  }

  fs.writeFileSync('./static/diary.json', JSON.stringify(data));
}

init();