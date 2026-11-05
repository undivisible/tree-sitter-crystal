use tree_sitter_language::LanguageFn;

extern "C" {
    fn tree_sitter_crystal() -> *const ();
}

pub const LANGUAGE: LanguageFn = unsafe { LanguageFn::from_raw(tree_sitter_crystal) };
pub const NODE_TYPES: &str = include_str!("../../src/node-types.json");
pub const HIGHLIGHTS_QUERY: &str = include_str!("../../queries/highlights.scm");

#[cfg(test)]
mod tests {
    #[test]
    fn grammar_and_highlight_query_load() {
        let language = super::LANGUAGE.into();
        let mut parser = tree_sitter::Parser::new();
        parser.set_language(&language).unwrap();
        tree_sitter::Query::new(&language, super::HIGHLIGHTS_QUERY).unwrap();
    }
}
