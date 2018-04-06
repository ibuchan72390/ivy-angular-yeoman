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
                name: this.options.name,
                materialName: this.getNameWithMaterial(),               // MaterialNotificationIcon
                kebabName: this.getKebabName(),                         // notification-icon
                kebabDotName: this.getKebabDotNameWithMaterial(),       // material.notification-icon
                kebabMaterialName: this.getKebabDashNameWithMaterial()  // material-notification-icon
            };
        }

        this.getNameWithMaterial = function () {

            let name = this.options.name;

            if (this.options.material) {
                name = 'Material' + name;

            }

            return name;
        }

        this.getKebabDashNameWithMaterial = function () {

            let kebabName = this.getKebabName();

            if (this.options.material) {
                kebabName = 'material-' + kebabName;
            }

            return kebabName;
        }

        this.getKebabDotNameWithMaterial = function () {

            let kebabName = this.getKebabName();

            if (this.options.material) {
                kebabName = 'material.' + kebabName;
            }

            return kebabName;
        }

        this.getKebabName = function () {
            return Case.kebab(this.options.name);
        }

    }

    copyServiceTypeScript() {

        this.fs.copyTpl(
            this.templatePath('template.service.ts'),
            this.destinationPath('src/Services/' + this.getKebabName() + '.service.ts'),
            this.getReplacementParams()
        );
    }

    copyServiceTest() {

        this.fs.copyTpl(
            this.templatePath('template.service.spec.ts'),
            this.destinationPath('test/' + this.getKebabName() + '.service.spec.ts'),
            this.getReplacementParams()
        );
    }
};