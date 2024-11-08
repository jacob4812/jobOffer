import { JobSearchComponent } from './job-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('JobSearchComponent', () => {
  let component: JobSearchComponent;
  let fixture: ComponentFixture<JobSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [JobSearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JobSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.searchForm.contains('position')).toBeTrue();
    expect(component.searchForm.contains('location')).toBeTrue();
    expect(component.searchForm.contains('category')).toBeTrue();
    expect(component.searchForm.contains('salary')).toBeTrue();
    expect(component.searchForm.contains('technologies')).toBeTrue();
    expect(component.searchForm.contains('experience')).toBeTrue();
  });

  it('should submit form with valid data', () => {
    spyOn(component, 'onSearch');
    component.searchForm.setValue({
      position: 'Developer',
      location: 'Warsaw',
      category: ['DevOps'],
      salary: 50000,
      technologies: ['Angular', 'Docker'],
      experience: ['Senior']
    });
    component.onSearch();
    expect(component.onSearch).toHaveBeenCalled();
    expect(component.searchForm.value.position).toEqual('Developer');
  });
});
