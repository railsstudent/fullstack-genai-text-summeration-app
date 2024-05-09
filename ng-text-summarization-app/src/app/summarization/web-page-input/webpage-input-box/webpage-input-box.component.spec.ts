import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageInputBoxComponent } from './webpage-input-box.component';

describe('WebpageInputBoxComponent', () => {
  let component: WebpageInputBoxComponent;
  let fixture: ComponentFixture<WebpageInputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebpageInputBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpageInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
