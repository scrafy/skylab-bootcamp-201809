import React, { Component } from 'react'

class Card extends Component {

    render() {

        const { course } = this.props
        const _default = {
            image: 'https://via.placeholder.com/170x100',
            title: 'No Title Available',
            subtitle: 'No Subtitle Available',
            short_summary: 'No Summary Available',
            summary: 'No Description Available',
            level: 'beginner'
        }

        return (
            <div className="card">
                <div className="card-top">
                    <img src={course.image || _default.image} alt="todo"></img>
                    <div className="card-info">
                        <h3 className="title">{course.title || _default.title}</h3>
                        <h5 className="subtitle">{course.subtitle || _default.subtitle}</h5>
                        <p className="short-summary">{course.short_summary.length ? course.short_summary : _default.short_summary}</p>
                    </div>
                </div>

                <div className="card-middle">
                    <span>+  Course Details</span>
                    <span>{course.level || _default.level}</span>
                </div>
            </div>

        )
    }
}

export default Card