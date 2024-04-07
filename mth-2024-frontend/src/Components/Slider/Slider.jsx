import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import "./Slider.css"

function SimpleCarousel(photos) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    // variableWidth: true
  };
  console.log("photoss ",photos["photos"][0])
  return (
    <div className="slider-container">
      {(photos["photos"].length > 1) ? 
      <Slider {...settings}>
        {(photos["photos"] != undefined) ? photos["photos"].map((photo, index) => (
          <div>
            <img style={{objectFit:"cover", height:"500px", width:"100%", borderRadius:"28px"}} src={photo} />
            {console.log("yes photo",photo)}
          </div>
        )) : <div></div>
      }
      </Slider> : <div></div>
      
    }

    </div>
  );
}

export default SimpleCarousel;