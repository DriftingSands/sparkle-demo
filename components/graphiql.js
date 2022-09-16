const graphql = `
{
  panelList {
    items {
      _path
      _variation
      #animations
      dark
      background {
        color
        path
        altText
      }
      activeMenuItem
      id
      layers {
        ... on TextLayerModel{
          _model {
            title
          }
          leftBox {
            ...on TextItemModel{
              type
              content {
                plaintext
              }
              styles              
            }
          }
          rightBox {
            ...on TextItemModel{
              type
              content {
                plaintext
              }
              styles
            }
            ... on PanelMenuModel {
              _model {
                title
              }
              menuItems {
                text
                link
              }
            }
          }
          column {
            ...on TextItemModel{
              type
              content {
                plaintext
              }
              styles
            }
          }
        }
        ... on ImageLayerModel{
          _model {
            title
          }
          path
          altText {
            plaintext
          }
          id
          layerId
          basePosition
          fit
          overflow
        }
        ... on ShoppableMomentLayerModel {
          fit
          imageSelector
          width
          height
          content {
            id
            text
            pricetag
            x
            y
            
          }
        }
      }
    }
  }
}
`

export default graphql