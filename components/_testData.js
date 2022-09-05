export default {
  scenes: [
    {
      id: 'intro',
      timelineAnimationSettings: {
        globalAutoDelay: true,
        startDelay: 0
      },
      timelineAnimations: [
        {
          selector: '#rocks1',
          from: {
            left: "-10%",
            bottom: "-10%",
            opacity: 0.5,
            scale: 1,
          },
          to: {
            left: "0%",
            bottom: "0%",
            opacity: 1,
            scale: 1.1,
            duration: 1,
          },
        },
        {
          autoDelay: false,
          selector: '#rocks2',
          from: {
            left: "-20%",
          },
          to: {
            left: "0%",
            duration: 0.7,
          },
        },
        {
          autoDelay: false,
          selector: '#rocks3',
          from: {
            right: "-10%",
            bottom: "-20%",
            scale: 0.8,
          },
          to: {
            right: "0%",
            bottom: "0%",
            scale: 1,
            duration: 0.7,
          },
        },
        {
          selector: '#biker-layer',
          from: {
            y: "0%",
          },
          to: {
            keyframes: {
              "0%": { y: "0%" },
              "20%": { y: "0%" },
              "90%": { y: "100%" },
            },
            scrollTrigger: {
              trigger: "#biker-layer",
              start: "0px top",
              end: "100% top",
              toggleActions: "play reverse play reverse",
              scrub: 0.5,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
          },
        },
        {
          autoDelay: true,
          selector: '#biker',
          from: {
            scale: 0.8,
            y: "-60%",
            x: "-50%",
            opacity: 0,
          },
          to: {
            delay: '-0.2',
            keyframes: {
              "0%": {
                scale: 0.8,
                y: "-60%",
                x: "-50%",
                opacity: 0,
                ease: "sine.out",
              },
              "50%": {
                y: "-30%",
                x: "-25%",
                opacity: 1,
              },
              "100%": {
                y: "0%",
                x: "0%",
                opacity: 1,
                scale: 1,
              },
              easeEach: 'none'
            },
            ease: "power2.out",
            duration: 1,
          },
        },
      ],
      textLayer: {
        leftBox: [
          {
            type: "h3",
            styles: ["yellowBox"],
            content: "outdoor passion",
          },
          {
            type: "h2",
            styles: [],
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
          overflow: false,
          basePosition: "bottom-left",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks2.png",
          altText: "rocks2",
          id: "rocks2",
          overflow: false,
          basePosition: "bottom-left",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks3.png",
          altText: "rocks3",
          id: "rocks3",
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
      menu: {
        menuItems: [
          {
            text: "Intro",
            link: "#intro",
            active: true,
          },
          {
            text: "Outdoor Passion",
            link: "#outdoorPassion",
          },
          {
            text: "Into the Nature",
            link: "#intoTheNature",
          },
          {
            text: "Up to the Sky",
            link: "#upToTheSky",
          },
        ],
      },
    },

    //second Item

    {
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      timelineAnimations: [
        {
          selector: '#buy-bikeHelmet .textWrapper',
          from: {
            y: '-50%',
            opacity: 0,
          },
          to: {
            y: '0%',
            opacity: 1,
            duration: 0.5,
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
          },
          to: {
            opacity: 1,
            duration: 0.5,
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
            y: '-50%',
            opacity: 0,
          },
          to: {
            y: '0%',
            opacity: 1,
            duration: 0.5,
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
          },
          to: {
            opacity: 1,
            duration: 0.5,
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
            y: '-50%',
            opacity: 0,
          },
          to: {
            y: '0%',
            opacity: 1,
            duration: 0.5,
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
          },
          to: {
            opacity: 1,
            duration: 0.5,
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
            y: '-50%',
            opacity: 0,
          },
          to: {
            y: '0%',
            opacity: 1,
            duration: 0.5,
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
          },
          to: {
            opacity: 1,
            duration: 0.5,
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
      menu: {
        menuItems: [
          {
            text: "Intro",
            link: "#intro",
            active: true,
          },
          {
            text: "Outdoor Passion",
            link: "#outdoorPassion",
          },
          {
            text: "Into the Nature",
            link: "#intoTheNature",
          },
          {
            text: "Up to the Sky",
            link: "#upToTheSky",
          },
        ],
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
          selector: '#outdoorPassion .header',
          from: {
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 0%)',
          },
          to: {
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%)',
            ease: 'power2.inOut',
            duration: 1.5,
            scrollTrigger: {
              trigger: '#outdoorPassion',
              start: 'top bottom',
              end: 'top top',
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
              scrub: 0.5,
            },
          },
        },
        {
          selector: '#outdoorPassion .textLayer .left',
          from: {
            x: '-100%',
            opacity: 0,
            y: '0%',
          },
          to: {
            ease: 'none',
            keyframes: {
              '0%': {
                x: '-100%',
                opacity: 0,
                y: '0%',
                ease: 'none',
              },
              '25%': {
                x: '-50%',
                opacity: 1,
                ease: 'power2.in',
              },
              '50%': {
                x: '0%',
                opacity: 1,
                y: '0%',
                ease: 'power2.out',
              },
              '70%': {
                x: '0%',
                opacity: 1,
                y: '0%',
                ease: 'power2.inOut',
              },
              '90%': {
                x: '0%',
                opacity: 1,
                y: '-150%',
              },
            },
            scrollTrigger: {
              trigger: '#outdoorPassion',
              start: 'top bottom',
              end: '50% top',
              scrub: 0.5,
            },
          }
        },
      ],
      background: {
        path: '/WKND SPA/hybrid/AdobeStock_427738038.jpeg',
        altText: ''
      },
      textLayer: {
        leftBox: [
          {
            type: "h3",
            styles: [],
            content: "Your dates, your ride distances\nand your style of lodging!",
          },
          {
            type: "button",
            styles: ["yellowButton"],
            content: "know more",
          },
        ],
      },
      menu: {
        menuItems: [
          {
            text: "Intro",
            link: "#intro",
          },
          {
            text: "Outdoor Passion",
            link: "#outdoorPassion",
            active: true,
          },
          {
            text: "Into the Nature",
            link: "#intoTheNature",
          },
          {
            text: "Up to the Sky",
            link: "#upToTheSky",
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
          selector: '#intoTheNature #mountains',
          from: {
            y: '50%',
            scale: 1.2
          },
          to: {
            y: '50%',
            scale: 1,
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top bottom', 
              end: 'bottom bottom',
              scrub: 0.5,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              }
            },
            ease: 'expo.in'
          },
        },
        {
          selector: '#intoTheNature #water',
          from: {
            y: '70%',
          },
          to: {
            y: '30%',
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top bottom', 
              end: 'bottom bottom',
              scrub: 0.5,
            },
          },
          ease: 'power4.out'
        },
        {
          selector: '#intoTheNature #female-hiker-layer',
          from: {
            y: '0%',
            x: '0%',
            scale: 1,
          },
          to: {
            y: '100%',
            x: '-20%',
            scale: 1.6,
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              }
            },
            ease: 'power2.inOut'
          },
        },
        {
          selector: '#intoTheNature #female-hiker',
          from: {
            y: '70%',
            x: '16%',
            scale: 0.6,
          },
          to: {
            y: '13%',
            x: '16%',
            scale: 0.6,
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top bottom', 
              end: 'bottom bottom',
              scrub: 0.5,
            },
          },
          ease: 'power4.out'
        },
        {
          selector: '#intoTheNature #female-hiker',
          from: {
            y: '13%',
          },
          to: {
            y: '-10%',
            duration: 1,
            scrollTrigger: {
              trigger: '#intoTheNature1',
              start: '80% top',
              toggleActions: 'play none none reverse'
            },
            ease: 'none'
          },
        },
        {
          selector: '#intoTheNature .textLayer .left',
          from: {
            y: '120%',
          },
          to: {
            keyframes: {
              '0%': {y: '120%'},
              '45%': {y: '0%'},
              '50%': {y: '0%'},
              '100%': {y: '-180%'},
            },
            scrollTrigger: {
              trigger: '#intoTheNature',
              start: 'top 80%',
              end: 'bottom top',
              scrub: 0.5,
            },
          },
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
          basePosition: "bottom-center",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 2/water.png",
          altText: "water",
          fit: 'cover',
          id: "water",
          layerId: 'water-layer',
          overflow: false,
          basePosition: "bottom-center",
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
        leftBox: [
          {
            type: "h3",
            styles: ["yellowBox"],
            content: "into the nature",
          },
          {
            type: "h2",
            styles: [],
            content: "From coastal paths\nto hilltop climbs.",
          },
        ],
      },
      menu: {
        menuItems: [
          {
            text: "Intro",
            link: "#intro",
          },
          {
            text: "Outdoor Passion",
            link: "#outdoorPassion",
          },
          {
            text: "Into the Nature",
            link: "#intoTheNature",
            active: true,
          },
          {
            text: "Up to the Sky",
            link: "#upToTheSky",
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
        leftBox: [
          {
            type: "h2",
            styles: [],
            content: "From coastal paths\nto hilltop climbs.",
          },
          {
            type: 'span',
            styles: ['uppercase'],
            content: 'during your tour, we take care of all the logistics and out support vans'
          },
          {
            type: "button",
            styles: ["darkButton"],
            content: "into the nature",
          },
        ],
      },
      menu: {
        menuItems: [
          {
            text: "Intro",
            link: "#intro",
          },
          {
            text: "Outdoor Passion",
            link: "#outdoorPassion",
          },
          {
            text: "Into the Nature",
            link: "#intoTheNature",
            active: true,
          },
          {
            text: "Up to the Sky",
            link: "#upToTheSky",
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
        zIndex: '-3',
      },
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      timelineAnimations: [
        {
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
              }
            }
          }
        },
        {
          selector: '#upToTheSky',
          from: {
          },
          to: {
            scrollTrigger: {
              pin: '#upToTheSky',
              trigger: '#upToTheSky',
              // markers: true,
              start: 'top top',
              end: '20% top',
            },
          },
        },
        {
          selector: '#upToTheSky #mountain1',
          from: {
            y: '0%',
            scale: 1,
          },
          to: {
            y: '-1%',
            scale: 1.05,
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 0.5,
            }
          },
        },
        {
          selector: '#upToTheSky #mountain2',
          from: {
            scale: 1,
            transformOrigin: 'bottom right',
          },
          to: {
            scale: 1.2,
            transformOrigin: 'bottom right',
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 0.5,
            }
          },
        },
        {
          selector: '#upToTheSky #mountain3',
          from: {
            scale: 1,
            transformOrigin: 'bottom right',
          },
          to: {
            scale: 1.4,
            transformOrigin: 'bottom right',
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 0.5,
            }
          },
        },
        {
          selector: '#upToTheSky #tent-layer',
          from: {
            y: '35%',
          },
          to: {
            y: '0%',
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 0.5,
            }
          },
        },
        {
          selector: '#upToTheSky #t0',
          from: {
            y: '0px',
            opacity: 1,
          },
          to: {
            y: '-200px',
            opacity: 0,
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 1,
            }
          },
        },
        {
          selector: '#upToTheSky #t1',
          from: {
            y: '0px',
            opacity: 1,
          },
          to: {
            y: '-200px',
            opacity: 0,
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 1,
            }
          },
        },
        {
          selector: '#upToTheSky #t2',
          from: {
            y: '100px',
          },
          to: {
            y: '-250px',
            duration: 1.5,
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 1,
            }
          },
        },
        {
          selector: '#upToTheSky #t3',
          from: {
            y: '400px',
          },
          to: {
            y: '-250px',
            duration: 1.5,
            scrollTrigger: {
              trigger: '#upToTheSky',
              start: 'top top',
              end: '20% top',
              scrub: 1,
            }
          },
        },
      ],
      textLayer: {
        type: 'column',
        column: [
          {
            type: 'h3',
            id: 't0',
            styles: ['yellowBox'],
            content: 'into the nature',
            zIndex: '-3',
          },
          {
            id: 't1',
            type: 'h2',
            styles: ['alignCenter'],
            content: "What's better than\nnature by night?",
            zIndex: '-3',
          },
          {
            id: 't2',
            type: 'span',
            styles: ['bold', 'white', 'alignCenter', 'L'],
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
            zIndex: '-3',
          },
          {
            id: 't3',
            type: 'button',
            styles: ['yellowButton'],
            content: "know more",
            zIndex: '3',
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
          zIndex: '23',
        },
        {
          path: "/WKND SPA/Into The Nature/Scene 1/Mountains/mountain2.png",
          altText: "mountain2",
          fit: 'cover',
          id: "mountain2",
          layerId: 'mountain2-layer',
          overflow: false,
          basePosition: "bottom-right",
          zIndex: '24',
        },
        {
          path: "/WKND SPA/Into The Nature/Scene 1/Mountains/mountain3.png",
          altText: "mountain3",
          fit: 'cover',
          id: "mountain3",
          layerId: 'mountain3-layer',
          overflow: false,
          basePosition: "bottom-right",
          zIndex: '25',
        },
        {
          path: "/WKND SPA/Into The Nature/Scene 1/Tent/tent.png",
          altText: "tent",
          fit: 'cover',
          id: "tent",
          layerId: 'tent-layer',
          overflow: false,
          basePosition: "bottom-center",
          zIndex: '28',
        },
      ],



      menu: {
        menuItems: [
          {
            text: "Intro",
            link: "#intro",
          },
          {
            text: "Outdoor Passion",
            link: "#outdoorPassion",
          },
          {
            text: "Into the Nature",
            link: "#intoTheNature",
          },
          {
            active: true,
            text: "Up to the Sky",
            link: "#upToTheSky",
          },
        ],
      },
    },
  ],
};
