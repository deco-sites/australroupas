window.SizebayPrescript = () => ({
    getPermalink() {
      const permalink = "https://www.austral.com.br" + window.location.pathname;
      return permalink
    },
    getIntegration() {
      const appUrl = `https://vfr-v3-production.sizebay.technology/V4/implantation/index.js`
  
      let app = document.createElement('script')
      app.id = 'szb-vfr__base'
      app.setAttribute('src', appUrl)
      document.querySelector('head').appendChild(app)
    },
    getAnchor() {
      return {
        mobile: 'div.inline--default.product__select',
        web: 'div.inline--default.product__select'
      }
    },
    getTenantId() {
      return 1125
    },
    getButtons() {
      return {
        order: [
          { name: 'vfr', text: ' ' },
          { name: 'chart', text: ' ' }
        ],
        position: 'after',
        class: 'vfr__button--clean'
      }
    },
    getLanguage() {
      return 'br'
    },
    getRecommendationText() {
      return {
        default: 'Recomendamos "{size}" para  "{profileName}"',
        simplified: 'Recomendamos o tamanho "{size}"',
        order: 'before'
      }
    }
  })
  const createCustomStyle = () => {
    const styles = [
      'https://static.sizebay.technology/1125/styles_v4.css',
      'https://static.sizebay.technology/font/stores/fontRuler/styles.css'
    ]

    for (const iterator of styles) {
      let linkElem = document.createElement('link')
  
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('type', 'text/css')
      linkElem.setAttribute('href', iterator)
  
      document.querySelector('body').appendChild(linkElem)
    }
  }
  
  const creatElementSpan = () => {
    let vfrSpan = document.createElement('span')
    let chartSpan = document.createElement('span')
  
    vfrSpan.textContent = 'Provador Virtual'
    vfrSpan.setAttribute('id', 'szb-vfr-span')
    chartSpan.textContent = 'Tabela de medidas'
    chartSpan.setAttribute('id', 'szb-chart-span')
  
    document.querySelector('#szb-vfr-button').append(vfrSpan)
    document.querySelector('#szb-chart-button').append(chartSpan)
  }
  
  ;(() => {
    const { SizebayPrescript } = window
    createCustomStyle()
    SizebayPrescript().getIntegration()
  
    const permalink = SizebayPrescript().getPermalink()
    const tenantId = SizebayPrescript().getTenantId()
    const buttons = SizebayPrescript().getButtons()
    const anchor = SizebayPrescript().getAnchor()
    const lang = SizebayPrescript().getLanguage()
    const recommendation = SizebayPrescript().getRecommendationText()
    const tick = 1000
    let bool = true
  
    const payload = {
      permalink,
      tenantId,
      buttons,
      anchor,
      lang,
      recommendation
    }
  
    const loaded = setInterval(() => {
      if (!document.querySelectorAll('.vfr__container').length && bool) {
        window.Sizebay.Implantation(payload)
        bool = false
      }
  
      if (document.querySelectorAll('#szb-vfr-button').length > 0) {
        creatElementSpan()
        document.querySelector('li.product__measures')?.remove()
        console.log('PRESCRIPT : VERSÃO 1.3')
        clearInterval(loaded)
      }
    }, tick)
  })()
  