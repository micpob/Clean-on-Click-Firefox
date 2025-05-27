document.addEventListener('click', (el) => {
  chrome.storage.local.get(['active'], (result) => {
    if (result.active) {
      if (isEditableElement(el.target)) {
        if (el.ctrlKey || el.metaKey) {
          el.target.value = ''
          el.target.innerText = ''
        }
      }
    
      if (el.target instanceof HTMLDivElement && isEditableElement(el.target) || el.target instanceof HTMLParagraphElement && isEditableElement(el.target)) {
        /* if (el.ctrlKey || el.metaKey) {
          el.target.parentElement.value = ''
          el.target.parentElement.innerText = ''
        } */
        
        if (isEditableElement(el.target.parentElement)) {
          if (el.ctrlKey || el.metaKey) {
            el.target.parentElement.value = ''
            el.target.parentElement.innerText = ''
            el.target.value = ''
            el.target.innerText = ''
          }
        }
      } 
    }
  })
})

const isEditableElement = (el) =>{
  if (el instanceof HTMLElement && el.isContentEditable) return true
  if (el instanceof HTMLInputElement) {
    if (/text|email|number|password|search|tel|url/.test(el.type || '')) {
      return !(el.disabled || el.readOnly)
    }
  }
  if (el instanceof HTMLTextAreaElement) return !(el.disabled || el.readOnly)
  return false
}
