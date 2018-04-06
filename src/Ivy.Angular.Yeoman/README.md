# Ivy.Angular.Yeoman

These are the current Work In Process generators for working with the Ivy.Angular project that is meant to complement the Ivy C# framework.

Each of these generators is capable of generating not only the templates, but also the test class structure.

This yeoman generator is not capable of updating your index.ts file or your module file, so that must be done manually.

Current Working Generators:
1. App
2. Component
3. Service


Generators in progress
1. Directive
2. Guard


Once you have completed your new addition, simply execute "yarn test" or if you wish to debug a specific launcher "yarn test-debug:launcher".

All tests default in running under PhantomJS in order to allow me to use this functionality on Bamboo CI Server.