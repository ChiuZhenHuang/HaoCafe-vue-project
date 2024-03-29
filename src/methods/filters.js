// 轉換千分號
export function currency (num) {
  const n = parseInt(num, 10)
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
}

// 轉換時間格式
export function date (time) {
  const localDate = new Date(time * 1000)
  const year = localDate.getFullYear()
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0') // 使用 padStart 方法補零
  const day = localDate.getDate().toString().padStart(2, '0')
  const hours = localDate.getHours().toString().padStart(2, '0')
  const minutes = localDate.getMinutes().toString().padStart(2, '0')
  const seconds = localDate.getSeconds().toString().padStart(2, '0')

  return `${year}/${month}/${day}  ${hours}:${minutes}:${seconds}`
  // const localDate = new Date(time * 1000)
  // return localDate.toLocaleDateString()
}
