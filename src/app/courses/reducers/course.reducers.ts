import { Course } from "../model/course";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { CoursesActions } from "../action-types";
import { on, createReducer } from "@ngrx/store";

export interface CoursesState extends EntityState<Course>{

}

export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(

  initialCourseState,

  on(CoursesActions.allCoursesLoaded, (state, action) => adapter.addAll(action.courses, state))
)
