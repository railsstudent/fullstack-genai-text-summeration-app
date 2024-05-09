import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeLanguageModelUsedComponent } from './large-language-model-used.component';

describe('LargeLanguageModelUsedComponent', () => {
  let component: LargeLanguageModelUsedComponent;
  let fixture: ComponentFixture<LargeLanguageModelUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeLanguageModelUsedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargeLanguageModelUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
