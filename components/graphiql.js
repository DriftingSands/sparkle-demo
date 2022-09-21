export const graphqlMaster = `
{
  pageList {
    items {
      _variation
      _variations 
      panels {
        _path
        _variation
        animations
        dark
        background {
          color
          path
          altText
        }
        activeMenuItem
        id
        layers {
          ... on TextLayerModel {
            id
            _model {
              title
            }
            _variation
            _variations
            leftBox {
              ... on TextItemModel {
                type
                id
                content {
                  plaintext
                }
                styles
              }
            }
            rightBox {
              ... on TextItemModel {
                type
                id
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
                  menuItemId
                }
              }
            }
            column {
              ... on TextItemModel {
                type
                id
                content {
                  plaintext
                }
                styles
              }
            }
          }
          ... on ImageLayerModel {
            _model {
              title
            }
            _variation
            _variations
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
            _model {
              title
            }
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
}
`

export const graphqlMobile = `
{
  pageList(variation: "mobile") {
    items {
      _variation
      _variations 
      panels {
        _path
        _variation
        _variations
        animations
        dark
        background {
          color
          isVideo
          path
          videoWidth
          videoHeight
          altText
        }
        activeMenuItem
        id
        layers {
          ... on TextLayerModel {
            id
            textPosition
            noPadding
            _model {
              title
            }
            _variation
            _variations
            leftBox {
              ... on TextItemModel {
                type
                id
                content {
                  plaintext
                }
                styles
              }
            }
            rightBox {
              ... on TextItemModel {
                type
                id
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
                  menuItemId
                }
              }
            }
            column {
              ... on TextItemModel {
                type
                id
                content {
                  plaintext
                }
                styles
              }
            }
          }
          ... on ImageLayerModel {
            _model {
              title
            }
            _variation
            _variations
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
            _model {
              title
            }
            id
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
}
`
