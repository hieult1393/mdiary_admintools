import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageContents from '../Admin/components/PageContents';

export default class Hompage extends Component {
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <PageContents/>
      </div>
    );
  }
}

