function notFirstOrLast(element, index, array) {
  return index > 0 && index < array.length - 1
}

document.querySelectorAll('pre[data-trim] code')
  .forEach(function (element) {
    element.innerHTML = element.innerHTML
      .split('\n')
      .filter(notFirstOrLast)
      .join('\n') + ' '
  })
