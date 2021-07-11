import React from 'react'
import PropTypes from 'prop-types'

const Color = ({ attributes, children, element }) => {
  console.log(element, attributes)
  return (

  <span style={{color: element.color}} {...attributes}>{children}</span>
)}

Color.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
}

export default Color
