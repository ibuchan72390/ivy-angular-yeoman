var Generator = require('yeoman-generator');
var Case = require('case');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {

    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Need the name of the project
        this.argument('name', { type: String, required: true });

        this.option('material');

        this.getReplacementParams = function () {
            return {
                name: this.getName(),
                dotName: this.getDotName(),
                kebabName: this.getKebabName()
            };
        }

        this.getName = function () {

            if (this.options.material) {
                return 'Material' + this.options.name;

            } else {
                return this.options.name;
            }
        }

        this.getDotName = function () {

            if (this.options.material) {
                return 'Material.' + this.options.name;

            } else {
                return this.options.name;
            }
        }

        this.getKebabName = function () {

            let kebab = Case.kebab(this.options.name);

            if (this.options.material) {
                kebab = 'material.' + kebab;
            }

            return kebab;
        }

        this.getIvyAngularName = function () {
            return 'Ivy.Angular.' + this.getDotName();
        }
    }

    setDestinationRoot() {

        this.log('Directory name is ' + this.getIvyAngularName());

        this.destinationRoot(this.getIvyAngularName());
    }

    logInputs() {

        this.log('Project name is ' + this.options.name);
        this.log('Module name is ' + this.getKebabName());
    }

    configureNsProj() {

        let src = this.templatePath('Ivy.Angular.Sample.njsproj-template');
        let dst = this.destinationPath(this.getIvyAngularName() + '.njsproj');

        this.fs.copyTpl(src, dst,
            this.getReplacementParams()
        );
    }

    configurePackageJson() {

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.getReplacementParams()
        );
    }

    configureReadMe() {

        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            this.getReplacementParams()
        );
    }

    configureTsConfig() {

        this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json')
        );
    }

    configureTypeScriptIndex() {

        this.fs.copyTpl(
            this.templatePath('index.ts'),
            this.destinationPath('index.ts'),
            this.getReplacementParams()
        );
    }

    configureTypeScriptModule() {

        let typeScriptModuleName = 'ivy.angular.' + this.getKebabName() + '.module.ts';

        this.log('TS Module Name is: ', typeScriptModuleName);

        this.fs.copyTpl(
            this.templatePath('template.module.ts'),
            this.destinationPath(typeScriptModuleName),
            this.getReplacementParams()
        );
    }

    configureKarma() {

        this.fs.copyTpl(
            this.templatePath('karma.conf.js'),
            this.destinationPath('karma.conf.js')
        );
    }

    configureWebpack() {

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );
    }

    setupTestFolder() {

        this.fs.copyTpl(
            this.templatePath('test-index.ts'),
            this.destinationPath('test/index.ts')
        );
    }

    setupProjectRequirements() {

        let projectRequirements = [
            '@angular/core',
            'rxjs',
            'core-js',
            'zone.js'
        ];

        this.yarnInstall(projectRequirements);
    }

    setupTestRequirements() {

        let testRequirements = [
            '@angular/common',
            '@angular/compiler',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@types/jasmine',
            'angular2-template-loader',
            'awesome-typescript-loader@5.0.0-1',
            'css-loader',
            'html-loader',
            'jasmine',
            'jasmine-core',
            'karma',
            'karma-bamboo-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-jasmine-html-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'time-fix-plugin',
            'typescript',
            'webpack'
        ];

        this.yarnInstall(testRequirements, { 'dev': true });
    }

    setupMaterialIfNecessary() {

        if (this.options.material) {

            // I THINK some of these can possibly be devDependencies
            let materialRequirements = [
                '@angular/material',
                '@angular/cdk',
                '@angular/forms',
                '@angular/animations'
            ];

            this.yarnInstall(materialRequirements);
        }
    }
};