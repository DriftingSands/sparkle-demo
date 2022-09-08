export default {
  settings: {
    header: 'mobile',
    maxWidth: 800,
  },
  scenes: [
    {
      id: 'intro',
      timelineAnimationSettings: {
        globalAutoDelay: true,
        startDelay: 0
      },
      timelineAnimations: [
        {
          selector: '#biker-layer',
          from: {
            y: "0%",
            scale: 2,
            x: '-10%', 
          },
          to: {
            y: "100%",
            scale: 2,
            x: '-10%', 
            scrollTrigger: {
              trigger: "#intro",
              start: "0px top",
              end: "100% top",
              scrub: true,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
            ease: 'none',
          },
        },
        {
          selector: '#introText0',
          from: {y: '30vh'},
          to: {y: '30vh'},
        },
        {
          selector: '#rocks1',
          from: {scale: 0.3, x: '-4%', transformOrigin: 'bottom left', },
          to: {scale: 0.3, x: '-4%', transformOrigin: 'bottom left', },
        },
        {
          selector: '#rocks2',
          from: {scale: 0.4, transformOrigin: 'bottom left', },
          to: {scale: 0.4, transformOrigin: 'bottom left', },
        },
        {
          selector: '#rocks3',
          from: {scale: 0.4, transformOrigin: 'bottom right', x: '10%'},
          to: {scale: 0.4, transformOrigin: 'bottom right', x: '10%'},
        },
      ],
      textLayer: {
        settings: {
          noPadding: true,
        },
        column: [
          {
            type: "h2",
            id: 'introText0',
            styles: ['alignCenter', ],
            content: "The most exciting \n experiences.",
          },
        ],
        rightBox: [],
      },
      background: {
        path: "/WKND SPA/Outdoor Passion/Scene 1/sky.jpg",
        altText: "sky",
      },
      images: [
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks1.png",
          altText: "rocks1",
          id: "rocks1",
          layerId: "rocks1-layer",
          overflow: false,
          basePosition: "bottom-left",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks2.png",
          altText: "rocks2",
          id: "rocks2",
          layerId: "rocks2-layer",
          overflow: false,
          basePosition: "bottom-left",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks3.png",
          altText: "rocks3",
          id: "rocks3",
          layerId: "rocks3-layer",
          overflow: false,
          basePosition: "bottom-right",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/biker.png",
          altText: "biker",
          fit: 'contain',
          id: "biker",
          layerId: "biker-layer",
          overflow: true,
          basePosition: "center-center",
        },
      ],
    },

    //2nd Item

    {
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      id: 'intro1',
      timelineAnimations: [
        {
          selector: '#intro1 #pointLayerId1',
          from: {x: '-10%', scale: 2, },
          to: {x: '-10%', scale: 2, },
        },
        {
          selector: '#buy-bikeHelmet .textWrapper',
          from: {
            y: '15%',
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: '65%',
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-bikeHelmet .dot',
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-shorts .textWrapper',
          from: {
            y: '15%',
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: '65%',
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-shorts .dot',
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-sneakers .textWrapper',
          from: {
            y: '15%',
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: '65%',
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-sneakers .dot',
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-tubes .textWrapper',
          from: {
            y: '15%',
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: '65%',
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
        {
          selector: '#buy-tubes .dot',
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5, delay: 1,
            scrollTrigger: {
              trigger: '#pointLayerId1',
              start: '20% 50%',
              end: '100% 10%',
              toggleActions: 'play none none reverse'
            }
          }
        },
      ],
      background: {
        color: '#ffea00',
      },
      textLayer: {
        id: 'pointLayerId1',
        pointText: {
          settings: {
            imgSelector: '#biker',
            fit: 'contain',
            // width: 6789,
            // height: 3960,
          },
          content: [
          {
            id: 'buy-bikeHelmet',
            text: 'Giro Adult Revel Bike Helmet',
            price: '$49.99',
            x: '11%',
            y: '-30.5%',
          },
          {
            id: 'buy-shorts',
            text: 'Adult Cyclist City Shorts',
            price: '$49.99',
            x: '-2.8%',
            y: '-14.2%',
          },
          {
            id: 'buy-sneakers',
            text: 'Enclave biking sneakers',
            price: '$49.99',
            x: '-7%',
            y: '9.5%',
          },
          {
            id: 'buy-tubes',
            text: 'Major Tread Specialty Tubes',
            price: '$49.99',
            x: '21%',
            y: '5%',
          },
        ]},
      },
    },


    // 3rd scene


    {
      sceneSettings: {
        dark: true
      },
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      id: 'outdoorPassion',
      timelineAnimations: [
        {
          selector: '#outdoorPassion',
          to: {
            scrollTrigger: {
              trigger: '#outdoorPassion',
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 0.5,
              snap: {
                delay: 0,
                snapTo: [0, 1],
              }
            },
          }
        },
        {
          selector: '#outdoorTextLayer',
          from: {y: '30%'},
          to: {y: '30%'},
        },
      ],
      background: {
        path: '/WKND SPA/hybrid/AdobeStock_427738038.jpeg',
        altText: ''
      },
      textLayer: {
        id: 'outdoorTextLayer',
        settings: {
          noPadding: true
        },
        column: [
          {
            type: "h3",
            styles: ['thin', 'alignCenter', 'S'],
            content: "Your dates, your ride distances\n and your style of lodging!",
          },
          {
            type: "button",
            styles: ["darkButton"],
            content: "sign up",
          },
        ],
      },
    },


    // 4th scene



    {
      id: 'intoTheNature',
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      timelineAnimations: [
        {
          selector: '#intoTheNature',
          to: {
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top bottom',
              end: 'bottom bottom',
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            }
          },
        },
        {
          selector: '#intoTheNature #mountains',
          from: {y: '50%', scale: 1.2, transformOrigin: 'bottom right', x: '20%', },
          to: {y: '50%', scale: 1.2, transformOrigin: 'bottom right', x: '0%', 
            scrollTrigger: {
              trigger: '#intoTheNature',
              toggleActions: 'play none none reverse',
              start: '30% top',
            },
          },
        },
        {
          selector: '#intoTheNature #water',
          from: {y: '35%', },
          to: {y: '35%', },
        },
        {
          selector: '#intoTheNature #water-layer',
          from: {y: '0%', scale: 2, transformOrigin: 'bottom center', x: '-50%', },
          to: {y: '0%', scale: 2, transformOrigin: 'bottom center', x: '50%', 
            scrollTrigger: {
              trigger: '#intoTheNature',
              toggleActions: 'play none none reverse',
              start: '30% top',
            },
          },
        },
        {
          selector: '#intoTheNature #female-hiker-layer',
          from: {y: '25%', scale: 0.4, x: '0%', },
          to: {y: '95%', scale: 0.5, x: '0%', 
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
            ease: 'none',
          },
        },
        {
          selector: '#hikerGirlTextLayer',
          from: {y: '-20%', },
          to: {y: '-20%', },
        },
      ],
      background: {
        path: '/WKND SPA/Outdoor Passion/Scene 2/sky.jpg',
        altText: '',
      },
      images: [
        {
          path: "/WKND SPA/Outdoor Passion/Scene 2/mountains.png",
          altText: "mountains",
          fit: 'cover',
          id: "mountains",
          layerId: 'mountains-layer',
          overflow: false,
          basePosition: "bottom-right",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 2/water.png",
          altText: "water",
          fit: 'cover',
          id: "water",
          layerId: 'water-layer',
          overflow: false,
          basePosition: "bottom-right",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 2/female-hiker.png",
          altText: "female-hiker",
          fit: 'contain',
          id: "female-hiker",
          layerId: 'female-hiker-layer',
          overflow: true,
          basePosition: "bottom-center",
        },
      ],
      textLayer: {
        settings: {
          noPadding: true,
        },
        id: 'hikerGirlTextLayer',
        column: [
          {
            type: "h3",
            styles: ["yellowBox"],
            content: "into the nature",
          },
          {
            type: "h2",
            styles: ['thin', 'alignCenter', ],
            content: "From coastal paths\nto hilltop climbs.",
          },
        ],
      },
    },


    // 5th scene


    {
      background: {
        color: '#ffea00',
      },
      id: 'intoTheNature1',
      timelineAnimationSettings: {},
      timelineAnimations: [
        {
          selector: '#intoTheNature1 .textLayer .left',
          from: {
            y: '100%',
          },
          to: {
            y: '0%',
            scrollTrigger: {
              trigger: '#intoTheNature1',
              start: '40% 80%',
              toggleActions: 'play none none reverse'
            },
          },
        },
        {
          selector: '#intoTheNature1-textLayer .columnWrapper',
          from: {gap: '20px', y: '35%'},
          to: {gap: '20px', y: '35%'},
        },
        {
          selector: '#intoTheNature1',
          from: {},
          to: {
            scrollTrigger: {
              trigger: '#intoTheNature1',
              start: 'bottom bottom',
              end: 'bottom top',
              snap: {
                snapTo: [0, 1],
                delay: 0,
              }
            }
          }
        },
      ],
      textLayer: {
        settings: {
          noPadding: true,
        },
        id: 'intoTheNature1-textLayer',
        column: [
          {
            type: "h2",
            styles: ['thin', 'alignCenter', 'S'],
            content: "Your dates, your distances\nand your style of lodging!",
          },
          {
            type: 'span',
            styles: ['uppercase'],
            content: 'during your tour, we take care of all\nthe logistics and out support vans'
          },
          {
            type: "button",
            styles: ["darkButton"],
            content: "sign up",
          },
        ],
      },
    },


    // 6th scene


    {
      id: 'upToTheSky',
      sceneSettings: {
        dark: true,
      },
      background: {
        path: '/WKND SPA/Into The Nature/Scene 1/Sky/AdobeStock_327178105.jpeg',
        altText: '',
      },
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      timelineAnimations: [
        // text animations
        {
          selector: '#sky-textLayer',
          from: {y: '50%'},
          to: {
            y: '0%',
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: '50% bottom',
              end: '50% bottom',
              toggleActions: 'play none none reverse',
            },
            ease: 'power2.inOut',
          },
        },
        {
          selector: '#upToTheSky #t0',
          from: {y: '0vh', },
          to: {y: '-80vh', 
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '2% top',
              toggleActions: 'play none none reverse',
            }
          },
        },
        {
          selector: '#upToTheSky #t1',
          from: {y: '0vh', },
          to: {y: '-80vh', 
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '2% top',
              toggleActions: 'play none none reverse',
            }
          },
        },
        {
          selector: '#upToTheSky #t2',
          from: {y: '0vh', },
          to: {y: '-20vh', 
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '2% top',
              toggleActions: 'play none none reverse',
            }
          },
        },
        {
          selector: '#upToTheSky #t3',
          from: {y: '0vh', },
          to: {y: '-20vh', 
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '2% top',
              toggleActions: 'play none none reverse',
            }
          },
        },

        // image animations

        {
          // just for snap
          selector: '#upToTheSky',
          from: {},
          to: {
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              snap: {
                snapTo: [0, 1],
                delay: 0,
                duration: 0.1,
                inertia: false,
              }
            }
          }
        },
        {
          // for pinning the scene
          selector: '#upToTheSky',
          from: {},
          to: {
            scrollTrigger: {
              pin: '#upToTheSky',
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              toggleActions: 'play none none reverse',
            },
          },
        },
        {
          selector: '#upToTheSky #mountain1',
          from: {
            y: '0%',
            scale: 2.5,
            transformOrigin: 'bottom center',
          },
          to: {
            y: '0%',
            scale: 2.5,
            transformOrigin: 'bottom center',
          },
        },
        {
          selector: '#upToTheSky #mountain2',
          from: {
            scale: 2.7,
            transformOrigin: 'bottom center',
          },
          to: {
            scale: 2.7,
            transformOrigin: 'bottom center',
          },
        },
        {
          selector: '#upToTheSky #tent-layer',
          from: {
            scale: 2,
            transformOrigin: 'bottom center',
            y: '35%',
          },
          to: {
            scale: 2,
            transformOrigin: 'bottom center',
            y: '0%',
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '2% top',
              toggleActions: 'play none none reverse',
            }
          },
        },
      ],
      textLayer: {
        settings: {
          noPadding: true,
        },
        id: 'sky-textLayer',
        column: [
          {
            type: 'h3',
            id: 't0',
            styles: ['yellowBox'],
            content: 'into the nature',
          },
          {
            id: 't1',
            type: 'h2',
            styles: ['alignCenter', 'thin'],
            content: "What's better than\nnature by night?",
          },
          {
            id: 't2',
            type: 'span',
            styles: ['white', 'alignCenter', 'L', 'uppercase'],
            content: "Lorem ipsum dolor sit amet,\n consectetur adipiscing elit, sed do\n eiusmod tempor incididunt ut\n labore et dolore magna aliqua. Ut",
          },
          {
            id: 't3',
            type: 'button',
            styles: ['darkButton'],
            content: "sign up",
          },
        ],
      },

      images: [
        {
          path: "/WKND SPA/Into The Nature/Scene 1/Mountains/mountain1.png",
          altText: "mountain1",
          fit: 'cover',
          id: "mountain1",
          layerId: 'mountain1-layer',
          overflow: false,
          basePosition: "bottom-center",
        },
        {
          path: "/WKND SPA/Into The Nature/Scene 1/Mountains/mountain2.png",
          altText: "mountain2",
          fit: 'cover',
          id: "mountain2",
          layerId: 'mountain2-layer',
          overflow: false,
          basePosition: "bottom-center",
        },
        {
          path: "/WKND SPA/Into The Nature/Scene 1/Tent/tent.png",
          altText: "tent",
          fit: 'cover',
          id: "tent",
          layerId: 'tent-layer',
          overflow: false,
          basePosition: "bottom-center",
        },
      ],

    },
  ],
};
