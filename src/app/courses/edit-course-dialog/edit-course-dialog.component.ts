import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CoursesHttpService} from '../services/courses-http.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Update } from '@ngrx/entity';
import { courseUpdated } from '../course.action';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$:Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<AppState>,
    private coursesService: CourseEntityService) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {

    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    if(this.mode == 'update') {
      this.coursesService.update(course);

      /* const update: Update<Course> = {
        id: course.id,
        changes: course
      };

      this.store.dispatch(courseUpdated({update}));
   */
      this.dialogRef.close();
    }
    else if(this.mode == 'create') {
      this.coursesService.add(course)
          .subscribe(
            newCourse => {
              console.log("New COurse", newCourse);

              this.dialogRef.close();
            }
          );

      /* const update: Update<Course> = {
        id: course.id,
        changes: course
      };

      this.store.dispatch(courseUpdated({update}));
   */
      this.dialogRef.close();
    }


  }


}
