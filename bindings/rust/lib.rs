use tree_sitter_language::LanguageFn;

extern "C" {
    fn tree_sitter_crystal() -> *const ();
}

pub const crystalUAGE: LanguageFn = unsafe { LanguageFn::from_raw(tree_sitter_crystal) };
