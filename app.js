// Flash

const flash = () => {
  let lang = navigator.language || navigator.userLanguage
  let flash = document.body.getElementsByClassName('Flash')[0]
  if (!lang.includes('es')) {
    flash.classList.remove('is-hidden')
  }
}

// Animation

let buttons = []
let elapsed = 0
let fps = 0
let fpsInterval = 0
let frameCount = 0
let now = 0
let startTime = 0
let stop = false
let then = 0
let $screen
let $screenMobile

const COLORS = [
  '#3C9678',
  '#E29F02',
  '#1E193B',
  '#FFFFFF'
]

const WORDS = [
  '28',
  'ABRIL',
  'CASA',
  'COMPUTACIONAL',
  'ENCENDIDA',
  'LIBROS',
  'MUTANTES',
  'POESIA',
  'POETRY SLASH',
  'POETRY',
  'SLASH',
  'VIERNES',
  'MADRID'
]

const WORDS_EN = [
  '28',
  'APRIL',
  'CASA',
  'COMPUTATIONAL',
  'ENCENDIDA',
  'BOOKS',
  'MUTANTS',
  'POETRY',
  'POETRY SLASH',
  'POETRY',
  'SLASH',
  'FRIDAY',
  'MADRID'
]

const  getSliceFromArray = (array, amount = 10) => {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, amount)
}

const start = (fps) => {
  fpsInterval = 1000 / fps
  then = window.performance.now()
  startTime = then
  animate()
}

const animate = (newtime) => {
  if (stop) {
    return
  }

  requestAnimationFrame(animate)

  now = newtime
  elapsed = now - then

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)
    randomizeColors(buttons)
    randomizeText()
  }
}

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

const transformToArray = (items) => {
  return Array.prototype.slice.call(items)
}

const setupScreen = () => {
  $screen = document.body.getElementsByClassName('js-screen')[0]
  $screenMobile = document.body.getElementsByClassName('js-screen-mobile')[0]
}

const setupButtons = () => {
  let items = document.body.querySelectorAll('[id^="button"]')

  for (let i = 0; i < items.length; i++) {
    let group = transformToArray(items[i].children)

    for (let j = 0; j < group.length - 1; j++) {
      buttons.push(group[j])
      group[j].style.transition = "all 250ms ease-in-out"
    }
  }
}

const getRandomWord = () => {
  let lang = document.documentElement.lang
  let words = WORDS
  if (lang === 'en') { words = WORDS_EN }
  return words[Math.floor(Math.random() * WORDS.length)]
}

const getRandomNumber = () => {
  let l = Math.random() * 1000000000
  return Math.floor(Math.random()*l) + '' + Math.floor(Math.random()*l/2)
}


const randomizeText = () => {
  let lines = []

  let c = 7

  for (var i = 0; i < c; i++) {
      lines.push(getRandomWord());
  }

  $screen.innerHTML = lines.join('<br />')
  $screenMobile.innerHTML = lines.join('<br />')
}

const randomizeColors = (items) => {
  let itemList = getSliceFromArray(items)

  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i]
    item.setAttribute('fill', getRandomColor())
  }
}

const setupInputs = () => {
  const inputs = document.body.getElementsByClassName('Input__text')
  const inputList = transformToArray(inputs)

  const onFocus = (e) => {
    e.target.parentElement.classList.add('is-selected')
  }

  const onBlur = (e) => {
    if (!e.target.value) {
      e.target.parentElement.classList.remove('is-selected')
    }
  }

  inputList.forEach(($input) => {
    $input.onfocus = onFocus
    $input.onblur = onBlur
  })
}

// Load

const onLoad = () => {
  setupInputs()
  setupButtons()
  setupScreen()
  start(5)
  flash()
}

window.onload = onLoad
