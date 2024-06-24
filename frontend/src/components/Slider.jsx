import React from 'react'
import Scrollspy from 'react-scrollspy'

export default function Slider() {
  return (
    <div>
 
      <div>
        <section id="section-1">section 1</section>
        <section id="section-2">section 2</section>
        <section id="section-3">section 3</section>
      </div>
    
      <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
        <li><a href="#section-1">section 1</a></li>
        <li><a href="#section-2">section 2</a></li>
        <li><a href="#section-3">section 3</a></li>
      </Scrollspy>
    
    </div>
  )
}
