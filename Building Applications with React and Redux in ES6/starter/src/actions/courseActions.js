import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export const createCourse = course =>
  ({type: types.CREATE_COURSE, course});

export const loadCoursesSuccess = courses =>
  ({type: types.LOAD_COURSES_SUCCESS, courses});

export const loadCourses = () => {
  return dispatch => {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
};
