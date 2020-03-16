import { Course, compareCourses } from "../model/course";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { CoursesActions } from "../action-types";
import { on, createReducer } from "@ngrx/store";

export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(

  initialCourseState,

  on(CoursesActions.allCoursesLoaded, (state, action) =>
  adapter.addAll(action.courses,
     {...state, allCoursesLoaded: true}))
);

export const {selectAll} = adapter.getSelectors();

