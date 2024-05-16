import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeParagraphComponent } from './summarize-paragraph-page.component';

describe('SummarizeParagraphComponent', () => {
  let component: SummarizeParagraphComponent;
  let fixture: ComponentFixture<SummarizeParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizeParagraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizeParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
