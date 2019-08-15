const Client = require('ssh2').Client

const conn = new Client()

conn.on('ready', () => {
  console.log('Client :: ready')
  // 首先需要获取远程服务器所有的文件
  conn.sftp((err, sftp) => {
    if (err) throw err
    sftp.readdir('/', (err, list) => {
      if (err) throw err
      console.dir(list)
      conn.end()
    })
  })
})

export default conn
