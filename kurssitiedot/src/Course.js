const Header = (props) => {
    return (
      <div>
        <h2>
          {props.course.name}
        </h2>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
          {parts.map(part => 
            <Part key={part.id} part={part}/>
            )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }
  
  const Total = (props) => {
    //const initialValue = {exercises: 0,};
    const total = props.parts.reduce(
      (previousValue, currentValue) => {
        return {exercises: previousValue.exercises + currentValue.exercises,}
      }
    );
    return (
      <div>
        <p>Total of {total.exercises} exercises</p>
      </div>
    )
  }

  const Course = (props) => {
    return (
      <div>
          <Header course = {props.course} />
          <Content  parts={props.course.parts} />
          <Total  parts={props.course.parts} />
      </div>
    )
  }
  
  export default Course
  
  