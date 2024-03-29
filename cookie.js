const crypto = require('crypto');
const fs = require('fs');

function encryptCookie(cookieValue) {
  // 生成密钥
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  // 创建加密器
  const cipher = crypto.createCipheriv('AES-256-CBC', key, iv);

  // 加密 cookie 值
  const encryptedCookie = cipher.update(cookieValue, 'utf8', 'base64');
  encryptedCookie += cipher.final('base64');

  return { key: key.toString('base64'), iv: iv.toString('base64'), encryptedCookie };
}

function saveEncryptedCookie(encryptedCookie, fileName) {
  // 以写入模式打开文件
  fs.open(fileName, 'w', (err) => {
    if (err) {
      console.error('无法打开文件:', err);
      return;
    }

    // 将加密后的 cookie 写入文件
    fs.writeSync(fs.openSync(fileName), JSON.stringify(encryptedCookie));

    // 关闭文件
    fs.closeSync(fs.openSync(fileName));
  });
}

const cookie = 'your_cookie_value';
const encryptedCookie = encryptCookie(cookie);
saveEncryptedCookie(encryptedCookie, 'mlf.txt');
