chrome.runtime.onStartup.addListener( () => {
  chrome.storage.local.get('active', (result) => {
    if (result.active) {
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    } else {
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } 
  })
})

chrome.runtime.onInstalled.addListener((details) => {
  const reason = details.reason

  switch (reason) {
     case 'install':
        chrome.storage.local.set({
          'active': true,
        }, () => {
          //setUpContextMenus()
        })
        break;
     case 'update':
      chrome.storage.local.get('active', (result) => {
        let active = typeof result.active == 'boolean' ? result.active : true
        chrome.storage.local.set({
          "active": active
        }, () => {
          /* chrome.contextMenus.removeAll(() => {
            setUpContextMenus()
          }) */
        })
      })
        break;
     default:
        break;
  }
})

chrome.action.onClicked.addListener( () => {
  chrome.storage.local.get('active', (result) => {
    if (result.active) {
      chrome.storage.local.set({ 'active': false })
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } else {
      chrome.storage.local.set({ 'active': true })
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    }
  })  
})

/* const setUpContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    const contextMenuMyOtherExtyensions = {
      id: 'myOtherExtensions',
      title: chrome.i18n.getMessage("context_menu_my_other_extensions"),
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuMyOtherExtyensions, () => chrome.runtime.lastError)
  })
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'myOtherExtensions') {
    chrome.tabs.create({ url: 'https://chromewebstore.google.com/search/micpob' })
  }
}) */
