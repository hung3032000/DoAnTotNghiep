import React from 'react';
import { Helmet } from 'react-helmet';
import Slice from 'components/web/slice/Slice'
import Loader from 'components/fullPageLoading';
const Home = function (props) {
  return (
    <div>
      <Loader showLoader={false}/>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <main id="main">
        <section aria-roledescription="carousel" className="home-carousel-container content-slot">
          <div className="swiper-container swiper-container-horizontal swiper-container-autoheight swiper-container-fade">
            <div className="swiper-wrapper" style={{ transitionDuration: '0ms' }}>
              <Slice 
              imageUrl="/image/Homepage_Carousel_Holiday_ForHer_Desktop.jpg"
              title= "Bag For Test"
              />
            </div>
          </div>
        </section>
        <div className="content-slot image-content-slot image-content-half container">
          <h2 className="slot-header">Cửa hàng trực tuyến</h2>
          <div className="row">
            <div className="image-content col-xs-6">
              <div className="background">
                <picture className>
                  <img src="/image/AntigonaPouch_Browse_Men.jpg" alt="" />
                </picture>
              </div>
              <a
                className="content promotion-impression"
                href="/#"
                data-promotion-id="null"
                data-promotion-name="null"
                data-promotion-creative="null"
                data-promotion-position="null"
              >
                <div className="primary">
                  <div className="primary">
                    <span style={{ color: '/#FFFFFF', fontFamily: '"Roboto Condensed"', fontSize: '24px' }}>Antigona bags for her </span>
                  </div>
                  <div className="cta-container">
                    <p className="form-button look-button">Mua ngay</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="image-content col-xs-6">
              <div className="background">
                <picture className>
                  <img src="/image/AntigonaPouch_Browse_Men.jpg" alt="" />
                </picture>
              </div>
              <a
                className="content promotion-impression"
                href="/#"
                data-promotion-id="null"
                data-promotion-name="null"
                data-promotion-creative="null"
                data-promotion-position="null"
              >
                <div className="primary">
                  <div className="primary">
                    <span style={{ color: '/#FFFFFF', fontFamily: '"Roboto Condensed"', fontSize: '24px' }}>
                      Antigona Bags for him <br />
                    </span>
                  </div>
                  <div className="cta-container">
                    <p className="form-button look-button">Mua ngay</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="category-slot category-browse-slot container">
          <div className="category-browse row tags-area">
            <div className="col col-xs-6">
              <a className="browse-header" href="/#">
                <h2>browse WOMEN</h2>
              </a>
              <ul>
                <li>
                  <a href="/#" className="tag-link">
                    New Arrivalsss
                  </a>
                </li>
              </ul>
            </div>
            <div className="col col-xs-6">
              <a className="browse-header" href="/#">
                <h2>BROWSE MEN</h2>
              </a>
              <ul>
                <li>
                  <a href="/#" className="tag-link">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Ready-to-wear
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Bags
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Shoes
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="category-slot container flatshot-3">
          <h2 className="slot-header">Mua ngay</h2>
          <div className="row">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="grid-tile col-xs-5 col-sm-4 col-lg-4 double flatshot-3 category" aria-roledescription="slide">
                  <a href="/#men/shoes/boots-derbies/">
                    <span className="text">Cửa hàng Boots &amp; Derbies </span>
                    <picture className>
                      <img src="/image/BH601ZH0NN001-01-01.jpg" alt="Boots & Derbies" srcSet />
                    </picture>
                  </a>
                </div>
                <div className="grid-tile col-xs-5 col-sm-4 col-lg-4 double flatshot-3 category " aria-roledescription="slide">
                  <a href="/#men/ready-to-wear/sweatshirts/">
                    <span className="text">Cửa hàng Sweatshirts </span>
                    <picture className>
                      <img src="/image/BH601ZH0NN001-01-01.jpg" alt="Sweatshirts" />
                    </picture>
                  </a>
                </div>
                {/* category swiper-slide */}
                <div className="grid-tile col-xs-5 col-sm-4 col-lg-4 double flatshot-3 category" aria-roledescription="slide">
                  <a href="/#">
                    <span className="text"> Cửa hàng Sneakers </span>
                    <picture className>
                      <img src="/image/BH601ZH0NN001-01-01.jpg" alt="Sneakers" />
                    </picture>
                  </a>
                </div>
              </div>
              {/* 					<div class="swiper-pagination"></div> */}
            </div>
          </div>
        </div>
        <div className="content-slot image-content-full-slot">
          <div className="image-content">
            <div className="background">
              <picture className>
                <img src="/image/Home-Full-Fall21-Desktop.jpg" alt="" />
              </picture>
            </div>
            <div className="content">
              <div className="primary">
                <div className="primary">
                  <span style={{ color: '#FFFFFF' }}>
                   BIG GIFT FOR HER <br />
                  </span>
                </div>
                <div className="cta-container">
                  <a className="form-button look-button" href>
                    Discover
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
