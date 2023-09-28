import { TestBed } from '@angular/core/testing';
import { ClassBinder } from './class-binder.service';
import { ElementRef } from '@angular/core';

describe('ClassBinder', () => {
  let service: ClassBinder;
  const addClassSpy = jest.fn();
  const elementRefStub = { nativeElement: { classList: { add: addClassSpy } } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClassBinder,
        {
          provide: ElementRef,
          useValue: elementRefStub,
        },
      ],
    });

    service = TestBed.inject(ClassBinder);
  });

  it('successfully initializes', () => {
    expect(service).toBeDefined();
  });

  it('calls add on a classList from nativeElement inside ElementRef', () => {
    service.bind('test-class');
    expect(addClassSpy).toHaveBeenCalledWith('test-class');
  });

  it('returns nativeElement of ElementRef', () => {
    expect(service.nativeElement).toBe(elementRefStub.nativeElement);
  });
});
