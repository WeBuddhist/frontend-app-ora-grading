import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { FooterSlot } from '@edx/frontend-component-footer';
import { LearningHeader as Header } from '@edx/frontend-component-header';

import { selectors } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';

import DemoWarning from 'containers/DemoWarning';
import ListView from 'containers/ListView';
import { MathJaxContext } from 'better-react-mathjax';

import './App.scss';
import Head from './components/Head';
import { mathJaxConfig } from './utils';

export const App = ({ courseMetadata, isEnabled, isInitialized }) => (
  <Router>
    <div>
      <Head />
      <Header
        courseTitle={courseMetadata.title}
        courseNumber={courseMetadata.number}
        courseOrg={courseMetadata.org}
        data-testid="header"
      />
      {isInitialized && !isEnabled && <DemoWarning />}
      <main data-testid="main">
        <MathJaxContext config={mathJaxConfig}>
          <ListView />
        </MathJaxContext>
      </main>
      <FooterSlot />
    </div>
  </Router>
);
App.defaultProps = {
  courseMetadata: {
    title: '',
    number: null,
    org: '',
  },
};
App.propTypes = {
  courseMetadata: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.string,
    org: PropTypes.string,
  }),
  isEnabled: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => ({
  courseMetadata: selectors.app.courseMetadata(state),
  isEnabled: selectors.app.isEnabled(state),
  isInitialized: selectors.requests.isCompleted(state, {
    requestKey: RequestKeys.initialize,
  }),
});

export default connect(mapStateToProps)(App);
