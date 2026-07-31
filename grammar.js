module.exports = grammar({
  name: 'crystal',
  rules: {
    source_file: $ => repeat(choice(
      $.method_definition,
      $._statement
    )),
    method_definition: $ => seq(
      'def', field('name', $.identifier), optional(field('parameters', $.parameters)), optional(seq(':', field('return_type', $.type))),
      optional(field('body', $.body)),
      'end'
    ),
    parameters: $ => seq('(', repeat(choice(/[^()]+/, $.parameters)), ')'),
    type: $ => /[a-zA-Z0-9_]+/,
    identifier: $ => /[a-zA-Z0-9_?!]+/,
    body: $ => prec.right(repeat1($._statement)),
    _statement: $ => choice(
      /[a-zA-Z0-9_?!]+/,
      /[^a-zA-Z0-9_?!\s]+/
    )
  }
});
