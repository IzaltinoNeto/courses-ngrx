import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Observable, pipe } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { tap, first, finalize, filter, map } from "rxjs/operators";
import { loadAllCourses } from "./course.action";
import { areCoursesLoaded } from "./courses.selectors";
import { CourseEntityService } from "./services/course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  loading = false;

  constructor(private coursesService: CourseEntityService,
    private store: Store<AppState>){

  }


  resolve(route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot): Observable<boolean> {
        return this.coursesService.getAll()
            .pipe(
              map(courses => !!courses)
            );
            return this.store
              .pipe(
                select(areCoursesLoaded),
                tap((coursesLoaded) => {
                  if(!this.loading && !coursesLoaded) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                  }

                }),
                filter(coursesLoaded => coursesLoaded),
                first(),
                finalize( () => this.loading = false)
              );
           }
}
