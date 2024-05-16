import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeBulletPointComponent } from './summarize-bullet-point.component';

describe('SummarizeBulletPointComponent', () => {
  let component: SummarizeBulletPointComponent;
  let fixture: ComponentFixture<SummarizeBulletPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizeBulletPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizeBulletPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
