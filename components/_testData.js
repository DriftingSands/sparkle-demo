export default {
  scenes: [
    {
      textLayer: {
        type: 'reverse',
        title: 'The most exciting \n experiences.',
        button: {
          size: 's',
          text: 'outdoor passion'
        }
      },
      background: {
        path: '/WKND SPA/Outdoor Passion/Scene 1/sky.jpg',
        altText: 'sky'
      },
      images: [
        {
          path: '/WKND SPA/Outdoor Passion/Scene 1/rocks1.png',
          altText: 'rocks1',
          overflow: false,
          basePosition: 'bottom left',
          imageAnimation: {
            from: {
              left: '-10%',
              bottom: '-10%',
              opacity: 0.5,
              scale: 1,
            },
            to: {
              left: '5%',
              bottom: '5%',
              opacity: 1,
              scale: 1.1,
              delay: 0.2,
              duration: 1
            }
          }
        },
        {
          path: '/WKND SPA/Outdoor Passion/Scene 1/rocks2.png',
          altText: 'rocks2',
          overflow: false,
          basePosition: 'bottom left',
          imageAnimation: {
            from: {
              left: '-20%',
            },
            to: {
              left: '0%',
              delay: 0.2,
              duration: 0.7
            }
          }
        },
        {
          path: '/WKND SPA/Outdoor Passion/Scene 1/rocks3.png',
          debug: true,
          altText: 'rocks3',
          overflow: false,
          basePosition: 'bottom right',
          imageAnimation: {
            from: {
              right: '-10%',
              bottom: '-20%',
              scale: 0.8,

            },
            to: {
              right: '0%',
              bottom: '0%',
              scale: 1,
              delay: 0.2,
              duration: 0.7
            }
          }
        },
        {
          path: '/WKND SPA/Outdoor Passion/Scene 1/biker.png',
          altText: 'biker',
          overflow: true,
          basePosition: 'center center',
          id: 'bikerLayer',
          layerAnimation: {
            from: {
              y: '0%'
            },
            to: {
              keyframes: {
                '0%': {y: '0%'},
                '20%': {y: '0%'},
                '90%': {y: '100%'},
              },
              scrollTrigger: {
                trigger: '#bikerLayer',
                start: '0px top',
                end: '100% top',
                toggleActions: 'play reverse play reverse',
                scrub: 1,
                markers: true,
                snap: {
                  snapTo: [0, 1],
                  delay: 0,
                },
              }
            }
          },
          imageAnimation: {
            from: {
              scale: 0.8,
              y: '-60%',
              x: '-50%',
              opacity: 0.1,
            },
            to: {
              keyframes: {
                '0%': {
                  scale: 0.8,
                  y: '-60%',
                  x: '-50%',
                  opacity: 0.1,
                  ease: 'sine.out',
                  delay: .2
                  // duration: 1,
                },
                '50%': {
                  opacity: 1
                },
                '100%': {
                  y: '0%',
                  x: '0%',
                  opacity: 1,
                  scale: 1
                }
              },
              ease: 'none',
              duration: 1.5,
            }
          }
        },
      ],
      menu: {
        menuItems: [
          {
            text: 'Intro',
            link: '#intro'
          },
          {
            text: 'Outdoor Passion',
            link: '#outdoorPassion'
          },
          {
            text: 'Into the Nature',
            link: '#intoTheNature'
          },
          {
            text: 'Up to the Sky',
            link: '#upToTheSky'
          },
        ]
      }
    }
  ]
}