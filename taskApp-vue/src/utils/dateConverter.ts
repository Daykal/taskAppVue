const todayDate = new Date()
const year = todayDate.getFullYear()
const month = String(todayDate.getMonth() + 1).padStart(2, '0')
const day = String(todayDate.getDate()).padStart(2, '0')

const todayString = `${year}-${month}-${day}`
export default todayString
