import { TestBed } from '@angular/core/testing';
import { ClassBinder } from './class-binder.service';
import { ElementRef } from '@angular/core';

describe('ClassBinder', () => {
  let service: ClassBinder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassBinder, { provide: ElementRef, useValue: {} }],
    });

    service = TestBed.inject(ClassBinder);
  });

  it('successfully initializes', () => {
    expect(service).toBeDefined();
  });
});
