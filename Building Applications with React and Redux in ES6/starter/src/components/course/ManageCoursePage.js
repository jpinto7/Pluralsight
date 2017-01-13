import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({
      course: course
    });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.redirect();
      })
      .catch(error => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  render() {
    return(
      <CourseForm
        onSave={this.saveCourse}
        onChange={this.updateCourseState}
        allAuthors={this.props.authors}
        errors={this.state.errors}
        course={this.state.course}
        saving={this.state.saving} />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const getCourseById = (courses, id) => {
  const result = courses.find(course => course.id === id);
  return result === undefined ? null : result;
};

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.routeParams.id;
  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
};

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(courseActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
