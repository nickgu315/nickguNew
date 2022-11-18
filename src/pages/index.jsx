import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo, Suspense, useEffect } from 'react'
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";


// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const CabinSample = dynamic(() => import('@/components/canvas/CabinSample'), { ssr: false })
// Dom components go here
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}/>
);

/*
.menu-button {
  align-items: center;
  background: $dark;
  border: 0.1rem solid white;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  height: 3.5rem;
  justify-content: center;
  outline: none;
  user-select: none;
  width: 3.5rem;
  position: absolute;
}*/

const MenuButton = ({ onClick, isOpen, isOnOutsideSite }) => {
  return (
    <motion.button
      className="border-[2px] rounded-full w-[2.5rem] lg:w-[3.5rem] h-[2.5rem] lg:h-[3.5rem] bg-gradient-to-r from-green-200 text-center place-content-center"
      onClick={onClick}
      animate={isOpen ? "open" : "closed"}
      initial={false}
      whileHover={{
      zIndex: 1,
      scale: 1.25,
      transition: {
        duration: .25
      }
      }}
    >

      {isOpen ?
      <div className='place-content-center items-center flex flex-row'>
      <motion.div>

        <svg
          width="23"
          height="23"
          style={{ margin: "4px 0 0 2px" }}
          viewBox="0 0 23 23"
        >
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>


      </motion.div>

      </div>
      : isOnOutsideSite ?

      <div className='place-content-center items-center flex flex-row'>
      <motion.div>

      back


      </motion.div>

      </div>



      :


      <div className='place-content-center items-center flex flex-row text-xl lg:text-3xl'>
      <motion.div>

          📔


      </motion.div>

      </div>


      }


    </motion.button>
  );
};


const BackButton = ({ onClick, isOpen2, disableHi }) => {
  return (
    <motion.button
      className="border-[2px] rounded-full w-[2.5rem] lg:w-[3.5rem] h-[2.5rem] lg:h-[3.5rem] bg-gradient-to-r from-green-200 text-center place-content-center"
      onClick={disableHi}
      animate={isOpen2 ? "open" : "closed"}
      initial={false}
      whileHover={{
      zIndex: 1,
      scale: 1.25,
      transition: {
        duration: .25
      }
      }}
    >

      {isOpen2 ?
      <div className='place-content-center items-center flex flex-row'>
      <motion.div>

        <svg
          width="23"
          height="23"
          style={{ margin: "4px 0 0 2px" }}
          viewBox="0 0 23 23"
        >
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>


      </motion.div>

      </div>
      :
      <div className='place-content-center items-center flex flex-row text-xl lg:text-3xl'>
      <motion.div>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path fill="#fff" d="M22 13.5a1.5 1.5 0 0 0 0-3v3ZM.94 10.94a1.5 1.5 0 0 0 0 2.12l9.545 9.547a1.5 1.5 0 1 0 2.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 1 0-2.122-2.122L.94 10.94ZM22 10.5H2v3h20v-3Z"/>
      </svg>

      </motion.div>

      </div>


      }


    </motion.button>
  );
};



const leftMenu = [
  "Accessory",
  "Beanie",
  "Hoodie",
  "Long Sleeve",
  "Shirt",
  "Shorts"
];
const rightMenu = ["Small", "Medium", "Large", "X Large", "XX Large"];

const slideVerticalAnimation = {
  open: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      mass: 0.8,
      type: "spring"
    },
    display: "block"
  },
  close: {
    rotateX: -15,
    y: -320,
    opacity: 0,
    transition: {
      duration: 0.3
    },
    transitionEnd: {
      display: "none"
    }
  }
};

const slideHorizontalAnimation = {
  left: {
    x: 0,
    transition: {
      duration: 0.3
    }
  },
  right: {
    x: -250,
    transition: {
      duration: 0.3
    }
  }
};


export default function Page(props) {
  const [isOpen, toggleDropdown] = useCycle(false, true);
  const [isOpen2, toggleDropdown2] = useCycle(false, true);
  const [isLeftMenu, toggleMenu] = useCycle(true, false);
  const leftMenuHeight = (leftMenu.length + 1) * 65;
  const rightMenuHeight = (rightMenu.length + 1) * 65;
  const height = isLeftMenu ? leftMenuHeight : rightMenuHeight;

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const [disableHiValue, setDisableHiValue] = useState(false);
  const [routedWebsiteLink, setRoutedWebsiteLink] = useState();
  const [projectImageLinks, setProjectImageLinks] = useState();



  const disableHi = (websiteLink) => {
    console.log('to link:', websiteLink)
    setRoutedWebsiteLink(websiteLink)
    setDisableHiValue(!disableHiValue)
  }



  const setNoLink = () => {

    setRoutedWebsiteLink(null)

  }

  const [cardInfo, setCardInfo] = useState([{title: "Split Sharing",
                                            description: "Web App UI/UX Design, Fullstack Development",
                                            imageLink: "https://res.cloudinary.com/nickgu-com/image/upload/c_scale,w_1000/v1668554244/splisharing_square.png",
                                            websiteLink: "https://www.splitsharing.com", //"images", //
                                            imageLinks: [],
                                            disableHi: disableHi,
                                            projectImageLinks: setProjectImageLinks,
                                          },
                                          {title: "Eone Timepieces",
                                            description: "Web UI/UX Design, Graphic Design, Product Design",
                                            imageLink: "https://res.cloudinary.com/nickgu-com/image/upload/v1629910159/small_shop_collection_0bc377320d.png",
                                            websiteLink: "images", //"images", //
                                            imageLinks: [
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629901994/Screenshot_2021_08_25_at_10_31_08_PM_053ecbc523.png",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629910248/large_thetimepiece_0_18618bdb41.png",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629910177/large_Bradley_Apex_Silver_Black_Canvas_Lifestyle_0_db3a348248.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629910175/large_story_edge_6fe2b1155c.png",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629910159/large_Bradley_Element_Blue_table_0_f17d54da34.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629902134/large_Screenshot_2021_08_25_at_10_35_14_PM_30d3da16a1.png",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629907902/large_Screenshot_2021_08_25_at_10_30_01_PM_8d12fd2d24.png",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629907825/large_Screenshot_2021_08_25_at_10_32_13_PM_ce497315f6.png"],
                                            disableHi: disableHi,
                                            projectImageLinks: setProjectImageLinks,
                                          },
                                          {title: "Movabar",
                                            description: "Mobile App UI/UX Design, Graphic Design",
                                            imageLink: "https://res.cloudinary.com/nickgu-com/image/upload/v1629916276/large_Movabar_04_app_d3e0b59f1e.jpg",
                                            websiteLink: "images", //"images", //
                                            imageLinks: ["https://res.cloudinary.com/nickgu-com/image/upload/v1629916276/large_Movabar_04_app_d3e0b59f1e.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629916274/Movabar_04_cocktail_02_0d92682f93.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629916275/large_Movabar_04_cocktail_01_ec08e42dfd.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629916273/Movabar_04_cocktail_03_42088777a6.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629916275/Movabar_04_folded_fb8fe3f0c4.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629916277/Movabar_02_main_b17882ba54.jpg",
                                                        ],
                                            disableHi: disableHi,
                                            projectImageLinks: setProjectImageLinks,
                                          }
                                          ]);

  return (
    <div className='pb-[30px] mb-[30px] h-auto'>
    <motion.div initial="hidden" animate="visible"variants={{
        hidden: {
          scale: .8,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 2.25
          }
        },
      }}
    >
      <div
        className='absolute w-[90vw] lg:w-[50vw] px-[20px] py-[15px] text-sm rounded-2xl shadow-xl bg-white bg-opacity-5 lg:text-base top-[60px] lg:top-[30px] left-1/2 transform -translate-x-1/2'
        style={{ maxWidth: 'calc(100% - 28px)' }}>

        <div className='tracking-wider text-white text-4xl lg:text-2xl relative'>

            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 2
                  }
                },
              }}
            >
            <div className="absolute bottom-[0px] h-auto">
              {!routedWebsiteLink ?
              <MenuButton onClick={toggleDropdown} isOpen={isOpen}/>
              :
              <BackButton onClick={toggleDropdown2} isOpen={isOpen} {...{disableHi: setNoLink}}/>
              }
              <motion.div
                className="absolute w-[90vw] lg:w-[50vw] rounded-2xl shadow-xl top-[5.5rem] lg:top-[5.5rem] bg-black bg-opacity-30 left-[-20px]"

                style={{ height: 'auto'}}

                initial="close"
                animate={isOpen ? "open" : "close"}
                variants={slideVerticalAnimation}
              >

              {!disableHiValue || routedWebsiteLink==null ?
              <div className="flex flex-col items-center">
              <div className='flex flex-row items-center w-full text-left px-[2vw] lg:px-[2vw] text-[24px] lg:test-[28px] py-[2vw] text-gray-400'>

              Work Showcase
              </div>
                <div className="grid grid-cols-1 gap-[1.7vw] lg:grid-cols-2 lg:px-[2vw] h-auto lg:h-auto pb-[1vw] pt-[15px]">

                {cardInfo.map((cardInfo0, index) => (
                    <ProjectCard key={index} {...cardInfo0}/>

                ))}



                </div>
              </div>
              :
                <div>
                {routedWebsiteLink!=null && routedWebsiteLink!="images" ?

                  <div className='w-[90vw] lg:w-[50vw] h-full lg:h-full flex flex-row items-start overflow-y-auto'>
                  <object type="text/html" data={routedWebsiteLink}
                          className='w-[90vw] lg:w-[50vw] h-[80vh] lg:h-[80vh]'
                          >
                  </object>
                  </div>
                  :
                  <div className='w-[90vw] lg:w-[50vw] h-full lg:h-full flex flex-row items-start mb-[35px] pb-[35px]'>
                  <div className='w-[90vw] lg:w-[50vw] h-full lg:h-full flex flex-col items-center content-center pt-[40px] grid-cols-1 gap-[3vw]  lg:gap-[3.5vw]'>
                    


                  </div>
                  </div>
                }
                </div>

              }


              </motion.div>
            </div>

            </motion.div>

          <div>
            <div className='relative left-[60px] lg:left-[100px] text-2xl lg:text-[26px]'>
              I&#39;m <span className='text-green-200 text-[34px] lg:text-[30px] font-bold'>Nick Gu</span>.
              <br />
              <span className='text-2xl lg:text-[26px]'>UI/ UX Designer, </span>

              <br />
              <span className='text-2xl lg:text-[26px]'>Fullstack Developer </span>
              <br />
              <span className='text-green-200 text-2xl lg:text-[26px]'> & more</span>.
            </div>
          </div>

        </div>

      </div>

    </motion.div>






    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <CabinSample scale={0.5} route='/' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'UI/ UX Designer & Fullstack Developer' } }
}
