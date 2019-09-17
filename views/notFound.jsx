const React = require('react')
const { render } = require('react-dom')
const styled = require('styled-components')

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
`;


const NotFound = () => {
  return (
    <AppContainer>
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x1_5"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>
      <div className='c'>
        <div className='_404'>404</div>
        <hr />
        <div className='_1'>THE PAGE</div>
        <div className='_2'>WAS NOT FOUND</div>
        <a className='btn' href='#'>BACK TO MARS</a>
      </div>
    </AppContainer>
  )
};

render(<NotFound />, document.getElementById('root'));
