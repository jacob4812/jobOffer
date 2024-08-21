import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { JobSearchComponent } from './job-search.component';

describe('JobSearchComponent', () => {
  let component: JobSearchComponent;
  let fixture: ComponentFixture<JobSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSearchComponent, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JobSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls', () => {
    expect(component.searchForm.contains('position')).toBeTrue();
    expect(component.searchForm.contains('location')).toBeTrue();
  });

  it('should submit form', () => {
    spyOn(component, 'onSearch');
    component.searchForm.setValue({ position: 'Developer', location: 'Warsaw' });
    fixture.nativeElement.querySelector('button').click();
    expect(component.onSearch).toHaveBeenCalled();
  });
});
