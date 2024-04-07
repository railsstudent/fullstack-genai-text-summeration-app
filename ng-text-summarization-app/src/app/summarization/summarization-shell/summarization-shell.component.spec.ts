import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizationShellComponent } from './summarization-shell.component';

describe('SummarizationShellComponent', () => {
  let component: SummarizationShellComponent;
  let fixture: ComponentFixture<SummarizationShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizationShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizationShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
