/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 * 2018 - Charles Lehnert
 * This is heavily based on the react-docgen `displayNameHandler` but instead defines an `actualName` property on the
 * generated docs that is taken first from the component's actual name. This addresses an issue where the name that
 * the generated docs are stored under is incorrectly named with the `displayName` and not the component's actual name.
 *
 */

const docgen = require('react-docgen');

const { utils } = docgen;
const recast = require('recast');

const { getNameOrValue } = utils;
const {
  types: { namedTypes: types },
} = recast;

module.exports = function actualNameHandler(documentation, path) {
  // Function and class declarations need special treatment. The name of the
  // function / class is the displayName
  if (
    types.ClassDeclaration.check(path.node) ||
    types.FunctionDeclaration.check(path.node)
  ) {
    documentation.set('actualName', getNameOrValue(path.get('id')));
  } else if (
    types.ArrowFunctionExpression.check(path.node) ||
    types.FunctionExpression.check(path.node)
  ) {
    if (types.VariableDeclarator.check(path.parentPath.node)) {
      documentation.set(
        'actualName',
        getNameOrValue(path.parentPath.get('id')),
      );
    } else if (types.AssignmentExpression.check(path.parentPath.node)) {
      documentation.set(
        'actualName',
        getNameOrValue(path.parentPath.get('left')),
      );
    }
  } else if (
    // React.createClass() or createReactClass()
    types.CallExpression.check(path.parentPath.node) &&
    types.VariableDeclarator.check(path.parentPath.parentPath.parentPath.node)
  ) {
    documentation.set(
      'actualName',
      getNameOrValue(path.parentPath.parentPath.parentPath.get('id')),
    );
  } else {
    // Could not find an actual name
    documentation.set('actualName', '');
  }
};
