import { TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContentComponent
      ],
    }).compileComponents();
  });

  it('should create the main Content', () => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
