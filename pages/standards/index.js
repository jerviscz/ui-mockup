import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import StandardsListView from '../../components/ListView/StandardsListView';
import constants from '../../core/constants';
import {addStandardControlFamilies} from '../../utils/open-control-utils.js';

class AppsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { apps: [] };
  }

  componentDidMount() {
    document.title = 'Security Central | Standards';
  }

  componentWillMount() {
    this.getApps();
  }

  // Data stored in json/standards.json, which is defined in
  // core/constants.js
  getApps = ()=> {
    let that = this;
    fetch(constants.get_standards_url).then(r => r.json())
      .then(data => {
        return addStandardControlFamilies(data);
      })
      .then((result)=>{
        that.setState({apps : result});
      })
      .catch(e => console.log("ERROR: Something went wrong opening standards definition"));
  }

  render() {
    // The HTML is rendered from components/ListView/StandardsListView.js
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical">
        <StandardsListView apps={ this.state.apps }/>
        foo
      </Layout>
    );
  }

}

export default AppsPage;
