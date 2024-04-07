import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeResultsComponent } from './summarize-results.component';

describe('SummarizeResultsComponent', () => {
  let component: SummarizeResultsComponent;
  let fixture: ComponentFixture<SummarizeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizeResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarizeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
