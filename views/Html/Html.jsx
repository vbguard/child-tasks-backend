const React = require('react');
const PropTypes = require('prop-types')

const { Component } = React;

class Html extends Component {
  render() {
    const { title, styles, children } = this.props;

    // const content = ReactDOMServer.renderToString(<children>);
    return (
      <html>
        <head>
          <title>{title}</title>
          {styles && styles.map(style => <link rel="stylesheet" href={style} />)}
          <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" />
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    );
  }
}


Html.propTypes = {
  title: PropTypes.string.isRequired,
  styles: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.array.isRequired,
}

module.exports = Html;
