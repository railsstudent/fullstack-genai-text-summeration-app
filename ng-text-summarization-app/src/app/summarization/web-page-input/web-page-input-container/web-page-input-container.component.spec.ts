import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPageInputContainerComponent } from './web-page-input-container.component';

describe('WebPageContainerComponent', () => {
  let component: WebPageInputContainerComponent;
  let fixture: ComponentFixture<WebPageInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebPageInputContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebPageInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
