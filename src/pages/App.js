import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';

import styles from './App.style';
import withRoot from '../assets/Jss/withRoot';
import GlobalNavbar from '../components/GlobalNavbar/GlobalNavbar';
import Tabs from '../components/Tabs/Tabs';
import '../../public/styles/global.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //this.props.getMetricsDetails();
  }

  render() {
    const { classes, data } = this.props;
    return ( 
      <div data-test="component-app" className="App">
        <GlobalNavbar user="Mark and Saamantha Miller"/>
        <Tabs></Tabs>
        
      </div>
    );
  }
}

export default hot(module)((withRoot(withStyles(styles, { withTheme: true  })(App))));