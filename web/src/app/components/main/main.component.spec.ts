import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MainComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle nav menu on button click', () => {
    const button = debugElement.query(By.css('.navbar-toggler')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.isNavOpen).toBeTrue();

    button.click();
    fixture.detectChanges();
    expect(component.isNavOpen).toBeFalse();
  });

  it('should close nav menu on outside click', () => {
    component.isNavOpen = true;
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();

    expect(component.isNavOpen).toBeFalse();
  });
});
