,
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


{projectImageLinks.map((card, index) => (
      <img className='w-[82vw] lg:w-[42vw] h-[82vw] lg:h-[42vw] rounded-lg object-contain shadow-2xl' key={index} src={card} />
))}


<button className='w-[88vw] lg:w-[21vw] h-auto lg:h-[21vw] flex flex-col items-center'
  onClick={() => {
  disableHi(websiteLink)
  if (websiteLink =='images'){
    projectImageLinks(imageLinks)
  }
  }}>
  <img className='w-[82vw] lg:w-[21vw] h-auto rounded-lg object-contain shadow-2xl' src={imageLink} />
</button>

{cardInfo.map((props, index) => (
    <ProjectCard key={index} {...props}/>
))}
