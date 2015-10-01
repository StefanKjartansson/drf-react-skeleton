'use strict';

import React from 'react/addons';

export function findRef(component, ref) {
  let target;
  let c = component;
  let i = 0;
  let parts = ref.split('>');
  for (i = 0; i < parts.length; i++) {
    target = c.refs[parts[i]];
    if (target === undefined) {
      console.log(parts[i], target);
    }
    expect(target).not.toBeUndefined();
    c = target;
  }
  return target;
}

export function appendTarget() {
  let div = document.createElement('div');
  div.classList.add('test-container');
  document.getElementById('container').appendChild(div);
  return div;
}

export function clickRefButton(component, ref) {
  React.addons.TestUtils.Simulate.click(findRef(component, ref).getDOMNode());
}

export function setRefValue(component, name, value) {
  let target = findRef(component, name);
  expect(target).not.toBeUndefined();
  React.addons.TestUtils.Simulate.change(
    target.getDOMNode(), {target: {value: value}}
  );
}

export function getRefNode(component, ref) {
  return component.refs[ref];
}

export function renderShallowComponent(component, props, ...children) {
  const shallowRenderer = React.addons.TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
  return shallowRenderer.getRenderOutput();
}
