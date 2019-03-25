const presentation = {
  slides: [],
  currentIndex: 0,
  hide () {
    this.slides[this.currentIndex].forEach(function(element) {
      element.style.display = 'none'
    })
  },
  show () {
    this.slides[this.currentIndex].forEach(function(element) {
      element.style.removeProperty('display')
    })
    location.hash = this.currentIndex
  },
  start () {
    this.currentIndex = parseInt(location.hash.substring(1)) || 0
    this.show()
  },
  next () {
    if(this.currentIndex < this.slides.length - 1) {
      this.hide()
      this.currentIndex++
      this.show()
    }
  },
  prev () {
    if(this.currentIndex > 0) {
      this.hide()
      this.currentIndex--
      this.show()
    }
  }
}

document.querySelectorAll('section:not([data-skip])').forEach(function (slide) {
  slide.style.display = 'none'

  const fragments = slide.querySelectorAll('[data-enter], [data-exit]')
  let subSlides = 1
  fragments.forEach(function(fragment) {
    subSlides = Math.max(
      subSlides,
      parseInt(fragment.dataset.enter || 0) + 1,
      parseInt(fragment.dataset.exit || 0) + 1
    )
  })

  const timeline = []
  for(let j = 0; j < subSlides; j++) {
    timeline[j] = [slide]
  }

  fragments.forEach(function(fragment) {
    fragment.style.display = 'none'
    const enterAt = parseInt(fragment.dataset.enter || 0)
    const exitAt = parseInt(fragment.dataset.exit || subSlides)
    for(let i = enterAt; i < exitAt; i++) {
      timeline[i].push(fragment)
    }
  })

  presentation.slides = presentation.slides.concat(timeline)
})

presentation.start()

document.addEventListener('keydown', function (event) {
  switch(event.key) {
    case "ArrowRight":
    case " ":
    case "d":
      presentation.next()
      break
    case "ArrowLeft":
    case "a":
      presentation.prev()
      break
  }
})

document.addEventListener('click', function (event) {
  const x = event.clientX
  if (x > document.documentElement.clientWidth / 2) {
    presentation.next()
  } else {
    presentation.prev()
  }
})
