import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeAsListComponent } from './summarize-as-list.component';

describe('SummarizeAsListComponent', () => {
  let component: SummarizeAsListComponent;
  let fixture: ComponentFixture<SummarizeAsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizeAsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizeAsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
