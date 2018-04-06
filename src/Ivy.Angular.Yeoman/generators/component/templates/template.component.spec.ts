import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IvyAngular<%= materialName %>Module } from '../ivy.angular.<%= kebabDotName %>.module';

import { <%= materialName %>Component } from '../src/Components/<%= name %>/<%= kebabName %>.component';

describe('<%= materialName %>Component', () => {

    // Variables
    let fixture: ComponentFixture<<%= materialName %>Component>;
    let sut: <%= materialName %>Component;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngular<%= materialName %>Module
            ]
        });

        fixture = TestBed.createComponent(<%= materialName %>Component);
        sut = fixture.componentInstance;
    });


    // Tests
    //it('Sample Test', () => {
    //});
});