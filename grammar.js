module.exports = grammar({
  name: 'crystal',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  conflicts: $ => [
    [$.return_statement],
    [$.call, $._expr],
  ],

  rules: {
    source_file: $ => repeat(choice(
      $.class_declaration,
      $.method_definition,
      $._statement
    )),

    class_declaration: $ => seq(
      'class', field('name', $.identifier), optional(seq('<', field('superclass', $.identifier))),
      repeat(choice($.method_definition, $._statement)),
      'end'
    ),

    method_definition: $ => seq(
      optional(seq($.identifier, '.')),
      'def', field('name', $.identifier),
      optional(field('parameters', $.parameters)),
      optional(seq(':', field('return_type', $.type))),
      optional(field('body', $.body)),
      'end'
    ),

    parameters: $ => seq(
      '(',
      optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')'
    ),

    parameter: $ => seq(
      optional(choice('*', '&')),
      field('name', choice($.identifier, seq(choice('@', '@@', '$'), $.identifier))),
      optional(seq(choice(':', '='), $._expr))
    ),

    type: $ => /[a-zA-Z0-9_:]+/,

    body: $ => prec.right(repeat1($._statement)),

    _statement: $ => choice(
      $.print_statement,
      $.expression_statement,
      $.assignment,
      $.return_statement
    ),

    print_statement: $ => seq(choice('puts', 'print', 'p', 'pp'), field('value', $._expr)),

    expression_statement: $ => field('value', $._expr),

    assignment: $ => seq(
      field('name', $._lvalue),
      optional(seq(':', field('type', $.type))),
      '=',
      field('value', $._expr)
    ),

    _lvalue: $ => choice(
      $.identifier,
      seq(choice('@', '@@'), $.identifier),
      seq($.identifier, '.', $.identifier)
    ),

    return_statement: $ => seq('return', optional($._expr)),

    _expr: $ => choice(
      $.binary_expression,
      $.string,
      $.int,
      $.call,
      $.identifier,
      seq('@', $.identifier)
    ),

    binary_expression: $ => prec.left(seq(
      field('left', $._expr),
      choice('+', '-', '*', '/', '//', '%', '&', '|', '^', '<<', '>>', '==', '!=', '<', '<=', '>', '>='),
      field('right', $._expr)
    )),

    string: $ => choice(
      /"([^"\\]|\\.)*"/,
      /'([^'\\]|\\.)*'/
    ),

    int: $ => /-?\d+/,

    call: $ => seq(
      optional(seq(choice($.identifier, seq('@', $.identifier)), '.')),
      field('name', $.identifier),
      optional(field('arguments', $.arguments))
    ),

    arguments: $ => seq(
      '(',
      optional(seq($._expr, repeat(seq(',', $._expr)))),
      ')'
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_?!=]*/,

    comment: $ => seq('#', /[^\n]*/),
  },
});
