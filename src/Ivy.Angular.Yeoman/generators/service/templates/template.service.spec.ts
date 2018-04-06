import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyAngular<%= materialName %>Module } from '../ivy.angular.<%= kebabDotName %>.module';

import { <%= materialName %>Service } from '../src/Services/<%= kebabName %>.service';

describe('<%= materialName %>Service', () => {

    // Variables
    let sut: <%= materialName %>Service;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngular<%= materialName %>Module
            ]
        });

        sut = TestBed.get(<%= materialName %>Service);
    });


    // Tests
    //it('Sample Test', () => {
    //});
});