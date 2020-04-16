'use strict';

module.exports = {
  name: require('./package').name,

  lintTree(type) {
    const project = this.project;
    if (type === 'tests') {
      const DevelopmentPracticesLinter = require('./lib/development-practices-lint');
      return new DevelopmentPracticesLinter ({ project });
    }
  }
};
