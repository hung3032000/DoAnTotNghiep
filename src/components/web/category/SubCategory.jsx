import React from 'react';
// import PropTypes from 'prop-types';

subcategory.propTypes = {
  // data: PropTypes.array,
  // count: PropTypes.number,
};

subcategory.defaultProps = {
  // data: [],
  // count: 0,
};

function subcategory(props) {
  // const [categoryCList, setCategoryCList] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data  = await categoryCApi.getAll({ status: true });
  //       setCategoryCList(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  // console.log(data)
  return (
    <div>
      <div className="level-2">
        <div className="container">
          <a href className="level-2 back">
            1
          </a>
          <ul className="level-2 row">
            <li className="first-col col-xs-6 col-sm-12 col-md-3 col-md-margin-1">
              <p>
                <span>
                  <a href style={{ padding: 0, borderBottom: 0, lineHeight: 1 }}>
                    <img alt=" Antigona Soft" src="/image/Winter20_FlyOut_Women2.jpg" title />
                  </a>
                </span>
              </p>
            </li>

            {/* sub */}
            <li className="level-2 col-sm-3 col-md-2 " id="SHOES_W">
              <a className="level-2 navigation-hasSubMenu" href>
                <span>Shoes</span>
              </a>
              <div className="level-3">
                <a href className="level-3 back">
                  Shoes
                </a>
                <ul className="level-3">
                  <li className="level-3 " id="SNEAKERS_W">
                    <a className="level-3" href>
                      Sneakers
                    </a>
                  </li>
                  <li className="level-3 " id="FLATS_W">
                    <a className="level-3" href>
                      Flats
                    </a>
                  </li>
                  <li className="level-3 " id="BOOTS_W">
                    <a className="level-3" href>
                      Boots &amp; Booties
                    </a>
                  </li>
                  <li className="level-3 " id="SANDALS_PUMPS_W">
                    <a className="level-3" href>
                      High Heels
                    </a>
                  </li>
                </ul>
                <ul className="level-4">
                  <li className="level-4">
                    <a className="level-4" href>
                      Antigona
                    </a>
                  </li>
                  <li className="level-4">
                    <a className="level-4" href>
                      Bond
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default subcategory;
