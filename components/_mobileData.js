const data = {
  settings: {
    type: "mobile",
    maxWidth: 800,
  },
  panels: [
    {
      id: "intro",
      timelineAnimationSettings: {
        globalAutoDelay: true,
        startDelay: 0,
      },
      timelineAnimations: [
        {
          selector: "#biker-layer",
          from: {
            y: "0%",
            scale: 2,
            x: "-10%",
          },
          to: {
            y: "100%",
            scale: 2,
            x: "-10%",
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
            ease: "power1.inOut",
          },
        },
        {
          selector: "#bikerTextLayer",
          from: { y: "-10%" },
          to: { y: "-10%" },
        },
        {
          selector: "#rocks1",
          from: { scale: 0.3, x: "-4%", transformOrigin: "bottom left" },
          to: { scale: 0.3, x: "-4%", transformOrigin: "bottom left" },
        },
        {
          selector: "#rocks2",
          from: { scale: 0.4, transformOrigin: "bottom left" },
          to: { scale: 0.4, transformOrigin: "bottom left" },
        },
        {
          selector: "#rocks3",
          from: { scale: 0.4, transformOrigin: "bottom right", x: "10%" },
          to: { scale: 0.4, transformOrigin: "bottom right", x: "10%" },
        },
      ],
      layers: [
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 1/rocks1.png",
            altText: "rocks1",
          },
          settings: {
            id: "rocks1",
            layerId: "rocks1-layer",
            overflow: false,
            basePosition: "bottom-left",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 1/rocks2.png",
            altText: "rocks2",
          },
          settings: {
            id: "rocks2",
            layerId: "rocks2-layer",
            overflow: false,
            basePosition: "bottom-left",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 1/rocks3.png",
            altText: "rocks3",
          },
          settings: {
            id: "rocks3",
            layerId: "rocks3-layer",
            overflow: false,
            basePosition: "bottom-right",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 1/biker.png",
            altText: "biker",
          },
          settings: {
            fit: "contain",
            id: "biker",
            layerId: "biker-layer",
            overflow: true,
            basePosition: "center-center",
          },
        },
        {
          type: "text",
          content: {
            column: [
              {
                type: "h2",
                id: "introText0",
                styles: ["alignCenter", "thin"],
                content: "The most exciting \n experiences.",
              },
            ],
          },
          settings: {
            noPadding: true,
            textPosition: "bottom-center",
            id: "bikerTextLayer",
          },
        },
      ],
      background: {
        path: "/WKND SPA/Outdoor Passion/Scene 1/sky.jpg",
        altText: "sky",
      },
    },

    //2nd Item

    {
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      id: "intro1",
      timelineAnimations: [
        {
          selector: "#intro1 #pointLayerId1",
          from: { x: "-10%", scale: 2 },
          to: { x: "-10%", scale: 2 },
        },
        {
          selector: "#buy-bikeHelmet .textWrapper",
          from: {
            y: "15%",
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: "65%",
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-bikeHelmet .dot",
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-shorts .textWrapper",
          from: {
            y: "15%",
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: "65%",
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-shorts .dot",
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-sneakers .textWrapper",
          from: {
            y: "15%",
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: "65%",
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-sneakers .dot",
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-tubes .textWrapper",
          from: {
            y: "15%",
            opacity: 0,
            scale: 0.4,
          },
          to: {
            y: "65%",
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#buy-tubes .dot",
          from: {
            opacity: 0,
            scale: 0.4,
          },
          to: {
            opacity: 1,
            scale: 0.4,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#pointLayerId1",
              start: "30% 50%",
              toggleActions: "play none none reverse",
            },
          },
        },
      ],
      background: {
        color: "#ffea00",
      },
      layers: [
        {
          type: "text",
          settings: {
            id: "pointLayerId1",
          },
          content: {
            pointText: {
              settings: {
                imgSelector: "#biker",
                fit: "contain",
                // width: 6789,
                // height: 3960,
              },
              content: [
                {
                  id: "buy-bikeHelmet",
                  text: "Giro Adult Revel Bike Helmet",
                  price: "$49.99",
                  x: "11%",
                  y: "-30.5%",
                },
                {
                  id: "buy-shorts",
                  text: "Adult Cyclist City Shorts",
                  price: "$49.99",
                  x: "-2.8%",
                  y: "-14.2%",
                },
                {
                  id: "buy-sneakers",
                  text: "Enclave biking sneakers",
                  price: "$49.99",
                  x: "-7%",
                  y: "9.5%",
                },
                {
                  id: "buy-tubes",
                  text: "Major Tread Specialty Tubes",
                  price: "$49.99",
                  x: "21%",
                  y: "5%",
                },
              ],
            },
          },
        },
      ],
    },

    // 3rd panel

    {
      panelSettings: {
        dark: true,
      },
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      id: "outdoorPassion",
      timelineAnimations: [
        {
          selector: "#outdoorPassion",
          to: {
            scrollTrigger: {
              trigger: "#outdoorPassion",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.5,
              snap: {
                delay: 0,
                snapTo: [0, 1],
              },
            },
          },
        },
        {
          selector: "#outdoorTextLayer",
          from: { y: "-10%" },
          to: { y: "-10%" },
        },
      ],
      background: {
        path: "/WKND SPA/hybrid/AdobeStock_427738038.jpeg",
        altText: "",
      },
      layers: [
        {
          type: "text",
          settings: {
            id: "outdoorTextLayer",
            noPadding: true,
            textPosition: "bottom-center",
          },
          content: {
            column: [
              {
                type: "h3",
                styles: ["thin", "alignCenter", "S"],
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
      ],
    },

    // 4th panel

    {
      id: "intoTheNature",
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      timelineAnimations: [
        {
          selector: "#intoTheNature",
          to: {
            scrollTrigger: {
              trigger: "#intoTheNature",
              start: "top bottom",
              end: "bottom bottom",
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
          },
        },
        {
          selector: "#intoTheNature #mountains",
          from: { y: "50%", scale: 1.2, transformOrigin: "bottom right", x: "20%" },
          to: {
            y: "47%",
            scale: 1.4,
            transformOrigin: "bottom right",
            x: "20%",
            scrollTrigger: {
              trigger: "#intoTheNature",
              toggleActions: "play none none reverse",
              start: "10% top",
            },
            duration: 1,
          },
        },
        {
          selector: "#intoTheNature #water",
          from: { y: "35%" },
          to: { y: "35%" },
        },
        {
          selector: "#intoTheNature #water-layer",
          from: { y: "0%", scale: 2, transformOrigin: "bottom center", x: "50%" },
          to: {
            y: "0%",
            scale: 2.2,
            transformOrigin: "bottom center",
            x: "50%",
            scrollTrigger: {
              trigger: "#intoTheNature",
              toggleActions: "play none none reverse",
              start: "10% top",
            },
            duration: 1,
          },
        },
        {
          selector: "#intoTheNature #female-hiker-layer",
          from: { y: "0%", scale: 0.4, transformOrigin: "bottom center" },
          to: {
            y: "63%",
            scale: 0.5,
            transformOrigin: "bottom center",
            scrollTrigger: {
              trigger: "#intoTheNature",
              start: "top top",
              end: "bottom top",
              scrub: true,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
            ease: "power1.inOut",
          },
        },
        {
          selector: "#hikerGirlTextLayer",
          from: { y: "152px" },
          to: { y: "152px" },
        },
      ],
      background: {
        path: "/WKND SPA/Outdoor Passion/Scene 2/sky.jpg",
        altText: "",
      },
      layers: [
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 2/mountains.png",
            altText: "mountains",
          },
          settings: {
            fit: "cover",
            id: "mountains",
            layerId: "mountains-layer",
            overflow: false,
            basePosition: "bottom-right",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 2/water.png",
            altText: "water",
          },
          settings: {
            fit: "cover",
            id: "water",
            layerId: "water-layer",
            overflow: false,
            basePosition: "bottom-right",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Outdoor Passion/Scene 2/female-hiker.png",
            altText: "female-hiker",
          },
          settings: {
            fit: "contain",
            id: "female-hiker",
            layerId: "female-hiker-layer",
            overflow: true,
            basePosition: "bottom-center",
          },
        },
        {
          type: "text",
          content: {
            column: [
              {
                type: "h3",
                styles: ["yellowBox"],
                content: "into the nature",
              },
              {
                type: "h2",
                styles: ["thin", "alignCenter"],
                content: "From coastal paths\nto hilltop climbs.",
              },
            ],
          },
          settings: {
            noPadding: true,
            textPosition: "top-center",
            id: "hikerGirlTextLayer",
          },
        },
      ],
    },

    // 5th panel

    {
      background: {
        color: "#ffea00",
      },
      id: "intoTheNature1",
      timelineAnimationSettings: {},
      timelineAnimations: [
        {
          selector: "#intoTheNature1 .textLayer .left",
          from: {
            y: "100%",
          },
          to: {
            y: "0%",
            scrollTrigger: {
              trigger: "#intoTheNature1",
              start: "40% 80%",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#intoTheNature1-textLayer .columnWrapper",
          from: { gap: "15px", y: "-60px" },
          to: { gap: "15px", y: "-60px" },
        },
        {
          selector: "#intoTheNature1",
          from: {},
          to: {
            scrollTrigger: {
              trigger: "#intoTheNature1",
              start: "bottom bottom",
              end: "bottom top",
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
          },
        },
      ],
      layers: [
        {
          type: "text",
          settings: {
            noPadding: true,
            textPosition: "bottom-center",
            id: "intoTheNature1-textLayer",
          },
          content: {
            column: [
              {
                type: "h2",
                styles: ["thin", "alignCenter", "XS"],
                content: "Your dates, your distances\nand your style of lodging!",
              },
              {
                type: "span",
                styles: ["uppercase"],
                content: "during your tour, we take care of all\nthe logistics and out support vans",
              },
              {
                type: "button",
                styles: ["darkButton"],
                content: "sign up",
              },
            ],
          },
        },
      ],
    },

    // 6th panel

    {
      id: "upToTheSky",
      panelSettings: {
        dark: true,
      },
      background: {
        path: "/WKND SPA/Into The Nature/Scene 1/Sky/AdobeStock_327178105.jpeg",
        altText: "",
      },
      timelineAnimationSettings: {
        globalAutoDelay: false,
      },
      timelineAnimations: [
        // text animations
        {
          selector: "#sky-textLayer",
          from: { y: "50%" },
          to: {
            y: "0%",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "50% bottom",
              end: "50% bottom",
              toggleActions: "play none none reverse",
            },
            ease: "power2.inOut",
          },
        },
        {
          selector: "#upToTheSky #t0",
          from: { y: "0vh" },
          to: {
            y: "-80vh",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "2% top",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#upToTheSky #t1",
          from: { y: "0vh" },
          to: {
            y: "-80vh",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "2% top",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#upToTheSky #t2",
          from: { y: "0vh" },
          to: {
            y: "-20vh",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "2% top",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#upToTheSky #t3",
          from: { y: "0vh" },
          to: {
            y: "-20vh",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "2% top",
              toggleActions: "play none none reverse",
            },
          },
        },

        // image animations

        {
          // just for snap
          selector: "#upToTheSky",
          from: {},
          to: {
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "20% top",
              snap: {
                snapTo: [0, 1],
                delay: 0,
                duration: 0.1,
                inertia: false,
              },
            },
          },
        },
        {
          // for pinning the panel
          selector: "#upToTheSky",
          from: {},
          to: {
            scrollTrigger: {
              pin: "#upToTheSky",
              trigger: "#upToTheSky",
              start: "top top",
              end: "20% top",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#upToTheSky #mountain1",
          from: {
            y: "0%",
            scale: 2.5,
            transformOrigin: "bottom center",
          },
          to: {
            y: "0%",
            scale: 2.5,
            transformOrigin: "bottom center",
          },
        },
        {
          selector: "#upToTheSky #mountain2",
          from: {
            scale: 2.7,
            transformOrigin: "bottom center",
          },
          to: {
            scale: 2.7,
            transformOrigin: "bottom center",
          },
        },
        { selector: "#upToTheSky #tent", from: { x: "-1%" }, to: { x: "-1%" } }, // prettier ignore
        {
          selector: "#upToTheSky #tent",
          from: {
            scale: 3,
            transformOrigin: "bottom center",
          },
          to: {
            scale: 3.4,
            transformOrigin: "bottom center",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "2% top",
              toggleActions: "play none none reverse",
            },
          },
        },
        {
          selector: "#upToTheSky #tent-layer",
          from: {
            y: "35%",
          },
          to: {
            y: "0%",
            scrollTrigger: {
              trigger: "#upToTheSky",
              start: "top top",
              end: "2% top",
              toggleActions: "play none none reverse",
            },
          },
        },
      ],
      layers: [
        {
          type: "image",
          content: {
            path: "/WKND SPA/Into The Nature/Scene 1/Mountains/mountain1.png",
            altText: "mountain1",
          },
          settings: {
            fit: "cover",
            id: "mountain1",
            layerId: "mountain1-layer",
            overflow: false,
            basePosition: "bottom-center",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Into The Nature/Scene 1/Mountains/mountain2.png",
            altText: "mountain2",
          },
          settings: {
            fit: "cover",
            id: "mountain2",
            layerId: "mountain2-layer",
            overflow: false,
            basePosition: "bottom-center",
          },
        },
        {
          type: "image",
          content: {
            path: "/WKND SPA/Into The Nature/Scene 1/Tent/tent.png",
            altText: "tent",
          },
          settings: {
            fit: "cover",
            id: "tent",
            layerId: "tent-layer",
            overflow: false,
            basePosition: "bottom-center",
          },
        },
        {
          type: "text",
          settings: {
            noPadding: true,
            id: "sky-textLayer",
          },
          content: {
            column: [
              {
                type: "h3",
                id: "t0",
                styles: ["yellowBox"],
                content: "into the nature",
              },
              {
                id: "t1",
                type: "h2",
                styles: ["alignCenter", "thin"],
                content: "What's better than\nnature by night?",
              },
              {
                id: "t2",
                type: "span",
                styles: ["white", "alignCenter", "L", "uppercase"],
                content:
                  "Lorem ipsum dolor sit amet,\n consectetur adipiscing elit, sed do\n eiusmod tempor incididunt ut\n labore et dolore magna aliqua. Ut",
              },
              {
                id: "t3",
                type: "button",
                styles: ["darkButton"],
                content: "sign up",
              },
            ],
          },
        },
      ],
    },
  ],
};

export default data;
