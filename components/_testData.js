export default {
  scenes: [
    {
      timelineAnimationSettings: {
        autoDelay: true,
        debugButton: true,
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
            left: "5%",
            bottom: "5%",
            opacity: 1,
            scale: 1.1,
            delay: 0.2,
            duration: 1,
          },
        },
        {
          selector: '#rocks2',
          from: {
            left: "-20%",
          },
          to: {
            left: "0%",
            delay: 0.1,
            duration: 0.7,
          },
        },
        {
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
            delay: 0.1,
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
              // toggleActions: "play reverse play reverse",
              scrub: 1,
              snap: {
                snapTo: [0, 1],
                delay: 0,
              },
            },
          },
        },
        {
          selector: '#biker',
          from: {
            scale: 0.8,
            y: "-60%",
            x: "-50%",
            opacity: 0.1,
          },
          to: {
            delay: 0.1,
            keyframes: {
              "0%": {
                scale: 0.8,
                y: "-60%",
                x: "-50%",
                opacity: 0.1,
                ease: "sine.out",
                // duration: 1,
              },
              "50%": {
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
      // spacer
      // spacer
      // spacer
      // spacer
      // spacer
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
          basePosition: "bottom left",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks2.png",
          altText: "rocks2",
          id: "rocks2",
          overflow: false,
          basePosition: "bottom left",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/rocks3.png",
          debug: true,
          altText: "rocks3",
          id: "rocks3",
          overflow: false,
          basePosition: "bottom right",
        },
        {
          path: "/WKND SPA/Outdoor Passion/Scene 1/biker.png",
          altText: "biker",
          id: "biker",
          layerId: "biker-layer",
          overflow: true,
          basePosition: "center center",
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
            text: "Up to the Sky",
            link: "#upToTheSky",
          },
        ],
      },
    },
    {
      background: {
        color: 'yellow',
      },
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
            text: "Up to the Sky",
            link: "#upToTheSky",
          },
        ],
      },
    }
  ],
};
