import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo, Suspense, useEffect } from 'react'
import Modal from "../components/Modal";
import ProjectCard from "../components/canvas/ProjectCard";


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


const ResumeButton = ({ onClick, isOpen3, isOnOutsideSite }) => {
  return (
    <motion.button
      className="border-[2px] rounded-full w-[2.5rem] lg:w-[3.5rem] h-[2.5rem] lg:h-[3.5rem] bg-gradient-to-r from-green-200 text-center place-content-center"
      onClick={onClick}
      animate={isOpen3 ? "open" : "closed"}
      initial={false}
      whileHover={{
      zIndex: 1,
      scale: 1.25,
      transition: {
        duration: .25
      }
      }}
    >

      {isOpen3 ?
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

          📃


      </motion.div>

      </div>


      }


    </motion.button>
  );
};





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

      {!isOpen &&



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
      onClick={onClick}
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

const BackButton2 = ({ onClick, isOpen2, disableHi }) => {
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
  const [isOpen3, toggleDropdown3] = useCycle(false, true);
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
    //console.log('to link:', websiteLink)
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
                                          },
                                          {title: "Filture",
                                            description: "Web App UI/UX Design, Frontend Development, Graphic Design",
                                            imageLink: "https://res.cloudinary.com/nickgu-com/image/upload/v1629951368/Filture_furniture_app_sq_01_5ca0f712b7.jpg",
                                            websiteLink: "images", //"images", //
                                            imageLinks: ["https://res.cloudinary.com/nickgu-com/image/upload/v1629951459/Filture_furniture_app_sq_02_729b18b6f3.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629951202/Filture_furniture_web_sq_01_d69bf214ca.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629951779/Filture_furniture_web_sq_02_e99745f549.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629951814/Filture_rendering_sq_01_066bebb718.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629951813/Filture_rendering_sq_02_d08a14aee0.jpg",
                                                        "https://res.cloudinary.com/nickgu-com/image/upload/v1629952181/Filture_logo_sq_01_7725160468.jpg",
                                                        ],
                                            disableHi: disableHi,
                                            projectImageLinks: setProjectImageLinks,
                                          }
                                          ]);

  return (
    <div>
      <div className="absolute w-full top-0 h-auto py-[20px] flex flex-col items-center mt-[50px]">
        <motion.div
          className="absolute w-[90vw] md:w-[70vw] rounded-2xl shadow-xl bg-black bg-opacity-30 top-0 h-auto py-[20px]"
          initial="close"
          animate={isOpen || isOpen3 ? "close" : "open"}
          variants={slideVerticalAnimation}
        >
            {!isOpen && !isOpen3 &&
            <div className='absolute left-[20px] bottom-[20px] flex flex-col items-center gap-2'>
              <ResumeButton onClick={toggleDropdown3} isOpen3={isOpen3}/>
              <MenuButton onClick={toggleDropdown} isOpen={isOpen}/>
            </div>
            }
          <div className='relative left-[80px] lg:left-[100px] text-2xl lg:text-[30px]'>

            I&#39;m <span className='text-green-200 text-[34px] lg:text-[34px] font-bold '>Nick Gu</span>.
            <br />
            <span className='text-2xl lg:text-[30px]'>UI/ UX Designer, </span>

            <br />
            <span className='text-2xl lg:text-[30px]'>Fullstack Developer </span>
            <br />
            <span className='text-green-200 text-2xl lg:text-[30px]'> & more</span>.
          </div>
        </motion.div>
      </div>






            <div className="absolute w-full top-0 h-auto pt-[0px] md:py-[20px] flex flex-col items-center mt-[0px] md:mt-[50px]">

              <motion.div
                className="absolute w-[90vw] md:w-[70vw] rounded-2xl top-0 h-auto py-[20px]"
                initial="close"
                animate={isOpen ? "open" : "close"}
                variants={slideVerticalAnimation}
              >

              {!disableHiValue || routedWebsiteLink==null ?
              <div className="flex flex-col items-center relative">
                <div>
                  <div className='absolute left-[5px] md:left-[20px] top-[0px] md:top-[20px]'>
                    <BackButton onClick={toggleDropdown} isOpen={isOpen} {...{disableHi: setNoLink}}/>
                  </div>

                  <div className="grid grid-cols-1 gap-[1.7vw] lg:grid-cols-2 lg:px-[2vw] h-auto lg:h-auto pb-[1vw] pt-[60px] md:pt-[0px]">

                  {cardInfo.map((props, index) => (
                      <ProjectCard key={index} {...props}/>

                  ))}

                  </div>
                </div>
              </div>
              :
                <div className="flex flex-col items-center relative">
                {routedWebsiteLink!=null && routedWebsiteLink!="images" ?

                  <div>
                    <div className='absolute left-[5px] md:left-[20px] top-[0px] md:top-[20px]'>
                      <BackButton2 onClick={toggleDropdown2} isOpen={isOpen2} {...{disableHi: setNoLink}}/>
                    </div>
                    <object type="text/html" data={routedWebsiteLink}
                            className='w-[90vw] lg:w-[50vw] h-[88vh] lg:h-[95vh] pt-[60px] md:pt-[0px]'
                            >
                    </object>
                  </div>
                  :
                  <div className='w-[90vw] lg:w-[50vw] h-full lg:h-full flex flex-col items-start overflow-y-auto'>
                    <div className='absolute left-[5px] md:left-[20px] top-[0px] md:top-[20px]'>
                      <BackButton2 onClick={toggleDropdown2} isOpen={isOpen2} {...{disableHi: setNoLink}}/>
                    </div>
                    <div className='w-[90vw] lg:w-[50vw] h-full lg:h-full flex flex-col items-center content-center pt-[60px] md:pt-[0px] grid-cols-1 gap-[3vw]  lg:gap-[3.5vw]'>
                      {projectImageLinks.map((card, index) => (
                            <img className='w-[82vw] lg:w-[42vw] h-[82vw] lg:h-[42vw] rounded-lg object-contain shadow-2xl' key={index} src={card} />
                      ))}
                    </div>
                  </div>
                }
                </div>

              }


              </motion.div>
            </div>



            <div className="absolute w-full top-0 h-auto pt-[0px] md:py-[20px] flex flex-col items-center mt-[0px] md:mt-[50px]">

              <motion.div
                className="absolute w-[90vw] md:w-[70vw] rounded-2xl top-0 h-auto py-[20px]"
                initial="close"
                animate={isOpen3 ? "open" : "close"}
                variants={slideVerticalAnimation}
              >


              <div className="flex flex-col items-center relative">
                <div>
                  <div className='absolute left-[5px] md:left-[20px] top-[0px] md:top-[20px]'>
                    <BackButton onClick={toggleDropdown3} isOpen={isOpen3} {...{disableHi: setNoLink}}/>
                  </div>

                  <div className='w-[90vw] lg:w-[50vw] flex flex-col items-center content-center pt-[60px] md:pt-[0px] grid-cols-1 gap-[3vw]  lg:gap-[3.5vw] '>

                    <div className='w-[90vw] lg:w-[50vw] h-auto lg:h-auto rounded-lg object-contain shadow-2xl bg-black bg-opacity-70 py-[8px] px-[8px]'>
                      <div className='pl-[10px] md:pl-[20px] pt-[20px]'>
                      <h3 className='text-xl lg:text-3xl'>
                        Work Experience:
                      </h3>
                      <div className='py-[15px] px-[15px]'>
                        <h4 className='text-lg lg:text-2xl'>
                          2021 Dec - Present
                        </h4>
                        <p className='pl-[12px] text-lg lg:text-2xl font-bold'>
                          Independent Web Designer/ Fullstack Developer


                        </p>
                        <p className='pl-[12px] text-md lg:text-xl pt-[5px]'>Design & Fullstack Develop Web App with React, Node</p>
                      </div>

                      <div className='py-[15px] px-[15px]'>
                        <h4 className='text-lg lg:text-2xl'>
                           2013 Jan - 2021 Oct
                        </h4>
                        <p className='pl-[12px] text-lg lg:text-2xl font-bold'>
                          Co-founder & Chief Designer <br/> Eone Timepieces, Inc


                        </p>
                        <p className='pl-[12px] text-md lg:text-xl pt-[5px]'>
                          Successful Kickstarter Campaign raised over 400k;
                          <br/>
                          Develop Eone’s products from design, web design, sourcing to production management;
                          <br/>
                          Establish and design Eone’s brand Identity and UI on social media, website and other marketing materials & channels;
                          <br/>
                          Social Media & Digital Ad management
                          <br/>
                          Achieved ARR ~3million in 2018 as a D2C brand
                        </p>
                        <a className='pl-[12px] text-md lg:text-xl text-blue-400 ' target="_blank" rel="noreferrer" href="https://eone-time.com">eone-time.com</a>

                      </div>
                      </div>
                      <div className='pl-[10px] md:pl-[20px] pt-[20px]'>
                      <h3 className='text-xl lg:text-3xl'>
                        Education:
                      </h3>
                      <div className='py-[15px] px-[15px]'>
                        <h4 className='text-lg lg:text-2xl'>
                          2010 Sept - 2014 May
                        </h4>
                        <p className='pl-[12px] text-lg lg:text-2xl font-bold'>
                          Master in Architecture (MArch I)
                        </p>
                        <p className='pl-[12px] text-md lg:text-xl pt-[5px]'>
                          Harvard University, Graduate School of Design
                        </p>
                      </div>

                      <div className='py-[15px] px-[15px]'>
                        <h4 className='text-lg lg:text-2xl'>
                          2006 Sept - 2009 May
                        </h4>
                        <p className='pl-[12px] text-lg lg:text-2xl font-bold'>
                          Bachelor of Arts in Architectural Studies
                        </p>
                        <p className='pl-[12px] text-md lg:text-xl pt-[5px]'>
                          The University of Hong Kong
                        </p>
                      </div>


                      </div>

                    </div>



                  </div>
                </div>
              </div>






              </motion.div>
            </div>








    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <CabinSample scale={0.5} route='/' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'UI/ UX Designer & Fullstack Developer' } }
}
