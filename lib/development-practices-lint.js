const Plugin = require('broccoli-plugin');
const fs = require('fs');
const path = require('path');

module.exports = class DevelopmentPracticesLinter extends Plugin {
  constructor(options) {
    super([], {
      persistentOutput: true,
      annotation: 'DevelopmentPracticesLinter',
    });

    this.project = options.project;
  }
  build() {
    const outputPath = path.join(this.outputPath, 'development-practices.lint-test.js');
    if (!fs.existsSync(outputPath)) {
      const testResults = [
         this.validateAppDynamics()
      ];
      const testFile = this.project.generateTestFile('DevelopmentPracticesLint', testResults);
      fs.writeFileSync(outputPath, testFile, 'utf-8');
    }
  }

  validateAppDynamics() {
    const appdynamicsConfig = this.project.configCache.get('/Users/deepan/development/bg/bg-fe-development-lint/tests/dummy/config/environment|test').EmberENV.appDynamics;

    if (!(appdynamicsConfig && appdynamicsConfig.key)) {
      return { name: 'AppDynamics configuration', passed: false, errorMessage: 'No AppDynamics configuration' };
    } else {
      return { name: 'AppDynamics configuration', passed: true, errorMessage: 'AppDynamics configuration available' };
    }
  }
}
