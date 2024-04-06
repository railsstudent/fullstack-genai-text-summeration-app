import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeTranslatedPageComponent } from './summarize-translated-page.component';

describe('SummarizeTranslatedPageComponent', () => {
  let component: SummarizeTranslatedPageComponent;
  let fixture: ComponentFixture<SummarizeTranslatedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizeTranslatedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizeTranslatedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
