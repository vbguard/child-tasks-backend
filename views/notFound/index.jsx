const React = require('react')
const Html = require('../Html/Html')


const NotFound = () => {
  const styles = [
    `/public/css/notFound.css`
  ];

  return (
    <Html title="Not found 404" styles={styles}>
      <div className="bg-purple">
        <div className="stars">
          <div className="central-body">
            <img className="image-404" src="/public/img/notFound/404.svg" width="300px" />
            <a href="/" className="btn-go-home" target="_blank" rel='noreferrer noopener'>GO BACK HOME</a>
          </div>
          <div className="objects">
            <img className="object_rocket" src="/public/img/notFound/rocket.svg" width="40px" />
            <div className="earth-moon">
              <img className="object_earth" src="/public/img/notFound/earth.svg" width="100px" />
              <img className="object_moon" src="/public/img/notFound/moon.svg" width="80px" />
            </div>
            <div className="box_astronaut">
              <img className="object_astronaut" src="/public/img/notFound/astronaut.svg" width="140px" />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </div>
    </Html>
  )
};

module.exports = NotFound;
