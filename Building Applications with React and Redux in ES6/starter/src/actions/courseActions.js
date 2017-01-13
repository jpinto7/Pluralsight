import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'

export const loadCoursesSuccess = courses =>
  ({type: types.LOAD_COURSES_SUCCESS, courses});

export const updateCourseSuccess = course =>
  ({type: types.UPDATE_COURSE_SUCCESS, course});

export const createCourseSuccess = course =>
  ({type: types.CREATE_COURSE_SUCCESS, course});

export const loadCourses = () => {
  return dispatch => {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
};

export const saveCourse = course => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
};
