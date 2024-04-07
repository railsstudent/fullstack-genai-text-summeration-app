import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizationNavBarComponent } from './summarization-nav-bar.component';

describe('SummarizationNavBarComponent', () => {
  let component: SummarizationNavBarComponent;
  let fixture: ComponentFixture<SummarizationNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizationNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizationNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
