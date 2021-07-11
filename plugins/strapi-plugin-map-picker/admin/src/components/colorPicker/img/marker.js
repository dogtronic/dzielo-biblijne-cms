import React from 'react';

const SVGIconComponent = (props) => {
  const perc = props.perc || 0;
  return  <svg width="92px" height="54px" viewBox="0 0 92 54">
    <title>{perc}</title>
    <defs>
      <filter x="-54.5%" y="-200.0%" width="209.1%" height="500.0%" filterUnits="objectBoundingBox" id="filter-1">
        <feGaussianBlur stdDeviation="5" in="SourceGraphic"></feGaussianBlur>
      </filter>
      <filter x="-36.2%" y="-72.3%" width="172.3%" height="244.7%" filterUnits="objectBoundingBox" id="filter-2">
        <feGaussianBlur stdDeviation="3" in="SourceGraphic"></feGaussianBlur>
      </filter>
    </defs>
    <g id="Web" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="11-parcours-1---map" transform="translate(-782.000000, -214.000000)">
        <g id="actionpoints" transform="translate(250.000000, 147.000000)">
          <g id="18" transform="translate(547.000000, 67.000000)">
            <line x1="43.75" y1="48.75" x2="43.75" y2="27.5" id="Line-2" stroke="#1F2020" stroke-width="3" stroke-linecap="square"></line>
            <circle id="Oval" stroke="#FF5948" fill="#FF5948" cx="43.75" cy="13.75" r="13.25"></circle>
          </g>
        </g>
      </g>
    </g>
  </svg>
}
export default SVGIconComponent;