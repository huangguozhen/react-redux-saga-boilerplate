const headerStyle = theme => ({
  wrapper: {
    height: 80,
    paddingTop: 20,
    background: `url(${require('../../img/header-background.png')})`,
    backgroundSize: 'cover',
    textAlign: 'center'
  },
  title: {
    lineHeight: 1,
    paddingLeft: 24,
    fontSize: 22,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10
  },
  button: {
    width: 100,
    height: 35,
    fontSize: 16,
    padding: '5px 16px',
    border: '1px solid #fff'
  },
  left: {
    borderRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  right: {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }
});

export default headerStyle;
