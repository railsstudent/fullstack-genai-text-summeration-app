import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizePageComponent } from './summarize-page.component';

describe('SummarizePageComponent', () => {
  let component: SummarizePageComponent;
  let fixture: ComponentFixture<SummarizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
