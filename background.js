browser.runtime.onStartup.addListener( () => {
  browser.storage.local.get('active', (result) => {
    if (result.active) {
      browser.action.setIcon({path: 'Res/Icons/icon64.png'})
    } else {
      browser.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } 
  })
})

browser.runtime.onInstalled.addListener((details) => {
  const reason = details.reason

  switch (reason) {
     case 'install':
        browser.storage.local.set({
          'active': true,
        }, () => {
          //setUpContextMenus()
        })
        break;
     case 'update':
      browser.storage.local.get('active', (result) => {
        let active = typeof result.active == 'boolean' ? result.active : true
        browser.storage.local.set({
          "active": active
        }, () => {
          /* browser.contextMenus.removeAll(() => {
            setUpContextMenus()
          }) */
        })
      })
        break;
     default:
        break;
  }
})

browser.action.onClicked.addListener( () => {
  browser.storage.local.get('active', (result) => {
    if (result.active) {
      browser.storage.local.set({ 'active': false })
      browser.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } else {
      browser.storage.local.set({ 'active': true })
      browser.action.setIcon({path: 'Res/Icons/icon64.png'})
    }
  })  
})

/* const setUpContextMenus = () => {
  browser.contextMenus.removeAll(() => {
    const contextMenuMyOtherExtyensions = {
      id: 'myOtherExtensions',
      title: browser.i18n.getMessage("context_menu_my_other_extensions"),
      contexts: ['action']
    }
    browser.contextMenus.create(contextMenuMyOtherExtyensions, () => browser.runtime.lastError)
  })
}

browser.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'myOtherExtensions') {
    browser.tabs.create({ url: 'https://browserwebstore.google.com/search/micpob' })
  }
}) */
